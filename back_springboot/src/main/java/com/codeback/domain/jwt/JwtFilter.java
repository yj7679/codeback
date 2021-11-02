package com.codeback.domain.jwt;

import com.codeback.util.SecurityCipher;
import com.codeback.web.dto.LoginedUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class JwtFilter extends GenericFilterBean {

	// JWT를 위한 커스텀 필터

	@Value("${accessTokenCookieName}")
	private String accessTokenCookieName = "accessToken";

	@Value("${refreshTokenCookieName}")
	private String refreshTokenCookieName = "refreshToken";
	private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

	public static final String AUTHORIZATION_HEADER = "Authorization";
	String key ="c2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQtc2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQK";
	private TokenProvider tokenProvider;

	public JwtFilter(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}

	@Override // GenericFilterBean 에서 오버라이드
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {

		//토큰의 인증정보를 SecurityContext에 저장하는 역할

		HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
		//리퀘스트에서 토큰을 받는다
		String jwt = getJwtFromCookie(httpServletRequest);

		System.out.println("여기 jwt");
		System.out.println(jwt);
		String requestURI = httpServletRequest.getRequestURI();

		//토큰의 유효성 검증
		if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
			//토큰이 정상이면 토큰에서 authentication객체 받아온다
			String userEmail = tokenProvider.getUsernameFromToken(jwt);
			Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
			System.out.println("zzsd");
			System.out.println(claims.toString());
			Collection<? extends GrantedAuthority> authorities = Arrays
					.stream("USER".split(",")).map(SimpleGrantedAuthority::new)
					.collect(Collectors.toList());
			LoginedUser userDetails = new LoginedUser(userEmail, "USER");

			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

			//이후 SecurityContex에 set 한다
			SecurityContextHolder.getContext().setAuthentication(authentication);
			logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
		} else {
			logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
		}

		filterChain.doFilter(servletRequest, servletResponse);
	}

	//Request Header에서 토큰 정보를 꺼내오기 위한 메소드
	private String resolveToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			String accessToken = bearerToken.substring(7);
			if (accessToken == null) return null;

			return SecurityCipher.decrypt(accessToken);
		}
		return null;
	}

	private String getJwtFromCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		if(cookies==null){
			return null;
		}

		for (Cookie cookie : cookies) {
			if (accessTokenCookieName.equals(cookie.getName())) {
				String accessToken = cookie.getValue();
				if (accessToken == null) return null;

				return SecurityCipher.decrypt(accessToken);
			}
		}
		return null;
	}

	private String getJwtToken(HttpServletRequest request, boolean fromCookie) {
		if (fromCookie) return getJwtFromCookie(request);

		return getJwtFromRequest(request);
	}
}