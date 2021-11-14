package com.codeback.domain.jwt;

import com.codeback.web.dto.TokenDto;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class TokenProvider{
	// 서버에서 저장할 암호에 쓰는 키
	@Value("${tokenSecret}")
	private String tokenSecret;

	// 액세스 토큰 만료시간
	@Value("${tokenExpirationMsec}")
	private Long tokenExpirationMsec;

	// 리프레시 토큰 만료시간
	@Value("${refreshTokenExpirationMsec}")
	private Long refreshTokenExpirationMsec;

	private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);


	public Key getSignedKey(String secret) { // InitializingBean 에서 오버라이드 -> 빈이 생성되고 주입된후 시크릿 값을 Base64 Decode해서 key변수에 할당하려고
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	// 토큰의 유효성 검사하는 메소드
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(getSignedKey(tokenSecret)).build().parseClaimsJws(token);
			logger.info("올바른 JWT");
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			logger.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			logger.info("만료된 JWT 토큰입니다.");
		} catch (UnsupportedJwtException e) {
			logger.info("지원되지 않는 JWT 토큰입니다.");
		} catch (IllegalArgumentException e) {
			logger.info("JWT 토큰이 잘못되었습니다.");
		}
		return false;
	}

	public TokenDto generateAccessToken(Long userNumber) {
		Date now = new Date();
		Long duration = now.getTime() + tokenExpirationMsec;
		Date expiryDate = new Date(duration);
		Claims claims = Jwts.claims();
		claims.put("userNumber", userNumber);

		String token = Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(expiryDate)
				.signWith(getSignedKey(tokenSecret),SignatureAlgorithm.HS512)
				.compact();
		return new TokenDto(TokenDto.TokenType.ACCESS, token, duration, LocalDateTime.ofInstant(expiryDate.toInstant(), ZoneId.systemDefault()));
	}

	public TokenDto generateRefreshToken(Long userNumber) {
		Date now = new Date();
		Long duration = now.getTime() + refreshTokenExpirationMsec;
		Date expiryDate = new Date(duration);

		Claims claims = Jwts.claims();
		claims.put("userNumber", userNumber);

		String token = Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(expiryDate)
				.signWith(getSignedKey(tokenSecret),SignatureAlgorithm.HS512)
				.compact();

		return new TokenDto(TokenDto.TokenType.REFRESH, token, duration, LocalDateTime.ofInstant(expiryDate.toInstant(), ZoneId.systemDefault()));
	}

	public String getUsernameFromToken(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(getSignedKey(tokenSecret)).build().parseClaimsJws(token).getBody();
		return claims.getSubject();
	}

	public Long getUsernumberFromToken(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(getSignedKey(tokenSecret)).build().parseClaimsJws(token).getBody();
		return Long.parseLong(claims.get("userNumber").toString());
	}
	public LocalDateTime getExpiryDateFromToken(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(getSignedKey(tokenSecret)).build().parseClaimsJws(token).getBody();
		return LocalDateTime.ofInstant(claims.getExpiration().toInstant(), ZoneId.systemDefault());
	}


}