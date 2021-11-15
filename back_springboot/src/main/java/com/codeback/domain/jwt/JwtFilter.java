package com.codeback.domain.jwt;

import com.codeback.util.CookieUtil;
import com.codeback.util.RedisUtill;
import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.LoginedUser;
import com.codeback.web.dto.TokenDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.catalina.filters.ExpiresFilter;
import org.apache.tomcat.jni.Local;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;


@Component
public class JwtFilter extends OncePerRequestFilter {

	// JWT를 위한 커스텀 필터

	@Autowired
	private CookieUtil cookieUtil;

	@Autowired
	private RedisUtill redisUtill;

	@Autowired
	private TokenProvider tokenProvider;

	@Autowired
	private RedisTemplate<String, String> redisTemplate;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

		//리퀘스트에서 토큰을 받는다
		String accessToken = cookieUtil.getAccessTokenFromCookie(httpServletRequest);
		String refreshToken = cookieUtil.getRefreshTokenFromCookie(httpServletRequest);
		System.out.println("불러오기-------------------");
		System.out.println(refreshToken);

		if (accessToken == null && refreshToken == null){

			httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		}
		// 리프레시 토큰 만료 시
		else if (!tokenProvider.validateToken(refreshToken)) {
			// 로그아웃 시킴

			Cookie deleteAccessToken = new Cookie("accessToken", null);
			Cookie deleteRefreshToken = new Cookie("refreshToken", null);
			deleteAccessToken.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
			deleteRefreshToken.setMaxAge(0); // 쿠키의 expiration 타임을 0으로 하여 없앤다.
			deleteAccessToken.setPath("/");
			deleteRefreshToken.setPath("/"); // 모든 경로에서 삭제 됬음을 알린다.
			httpServletResponse.addCookie(deleteAccessToken);
			httpServletResponse.addCookie(deleteRefreshToken);
		}
		else if (!tokenProvider.validateToken(accessToken)){ // 액세스 토큰 만료시
			// Refresh

			LocalDateTime expTimeFromTokenT = tokenProvider.getExpiryDateFromToken(refreshToken);
			String expTimeFromToken = expTimeFromTokenT.format(DateTimeFormatter.ofPattern("yyyyMMddhhmmss"));
			System.out.println(expTimeFromToken);
			System.out.println("redis  "+ redisUtill);
			ValueOperations<String, String> vop = redisTemplate.opsForValue();
			String expTimeFromRedis = vop.get(refreshToken);
			System.out.println(expTimeFromRedis);
			if(!tokenProvider.validateToken(refreshToken) || !expTimeFromRedis.equals(expTimeFromToken)){
				// 리프레시 토큰이 유효하지않거나, 레디스에 저장해놓은 만료시간이 다르면

				httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			}
			else{
				// 리프레시 토큰이 유효하고, 레디스에도 잇으면 Refresh
				Long userNumber = tokenProvider.getUsernumberFromToken(refreshToken);
				TokenDto newAccessToken = tokenProvider.generateAccessToken(userNumber);
				httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, cookieUtil.createAccessTokenCookie(newAccessToken.getTokenValue(), newAccessToken.getDuration()).toString());

				Collection<? extends GrantedAuthority> authorities = Arrays
						.stream("USER".split(",")).map(SimpleGrantedAuthority::new)
						.collect(Collectors.toList());
				LoginedUser userDetails = new LoginedUser(userNumber, "USER");

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

				//이후 SecurityContex에 set 한다
				SecurityContextHolder.getContext().setAuthentication(authentication);
				httpServletResponse.setContentType("application/json");
				httpServletResponse.setCharacterEncoding("utf-8");

				httpServletResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
				httpServletResponse.getOutputStream().println("access token refresh");
				return;

			}

		}


		else{ // 권한 있는 경우
			Long userNumber = tokenProvider.getUsernumberFromToken(accessToken);

			Collection<? extends GrantedAuthority> authorities = Arrays
					.stream("USER".split(",")).map(SimpleGrantedAuthority::new)
					.collect(Collectors.toList());
			LoginedUser userDetails = new LoginedUser(userNumber, "USER");

			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

			//이후 SecurityContex에 set 한다
			SecurityContextHolder.getContext().setAuthentication(authentication);
			// 권한 있음 -> pass
		}
		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}




}