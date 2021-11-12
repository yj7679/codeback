package com.codeback.config.security;

import com.codeback.domain.jwt.*;
import com.codeback.service.user.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity // 기본적인 Web 보안을 활성화 하겠다는 뜻
@EnableGlobalMethodSecurity(prePostEnabled = true) // @PreAuthorize어노테이션을 메소드단위로 사용하기 위해 적용
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	@Autowired
	private JwtFilter jwtFilter;

	@Autowired
	private CorsFilter corsFilter;

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private JwtAccessDeniedHandler jwtAccessDeniedHandler;

	@Bean
	public PasswordEncoder passwordEncoder() {// 비밀번호 암호화
		return new BCryptPasswordEncoder();
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
				.antMatchers("/css/**",
						"/js/**",
						"/img/**",
						"/lib/**",
						"/h2-console/**",
						"/v2/**", // swagger
						"/webjars/**", // swagger
						"/swagger**", // swagger
						"/swagger-resources/**", // swagger
						"/member/**");
	}


	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				// token을 사용하는 방식이기 때문에 csrf를 disable합니다.
				.cors()
				.and()
				.csrf().disable()

				.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
				//익셉션 핸들링하려고 사용자정의클래스 추가
				.exceptionHandling()
				.authenticationEntryPoint(jwtAuthenticationEntryPoint)
				.accessDeniedHandler(jwtAccessDeniedHandler)
				.and()
				// enable h2-console -> h2안써서 주석
				//.and().headers().frameOptions().sameOrigin()

				// 세션을 사용하지 않기 때문에 STATELESS로 설정
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

				// authorizeRequests -> HttpServeletRequest를 사용하는 요청들에 대한 접근제한을 설정하겠다는 뜻
				// .antMatchers(path).permitAll() -> 해당 패스에 대한 요청은 인증없이 접근을 허용하겠다는 뜻

				.and().authorizeRequests().antMatchers("/auth/login")
				.permitAll().antMatchers("/user/signup").permitAll()
				.antMatchers("/auth/email/req").permitAll()
				.antMatchers("/auth/logout").permitAll()
				.antMatchers("/user/signup/page").permitAll()
				.antMatchers("/auth/startsignup").permitAll()
				.antMatchers("/auth/**").permitAll()
				.antMatchers("/auth/duplicate/nickname/**").permitAll()
				.antMatchers("/auth/duplicate/email/**").permitAll()
				.antMatchers("/auth/email/confirm").permitAll()
				.antMatchers("/room/verification").permitAll()
				.antMatchers("/room/delete").permitAll()
				.antMatchers("/user/passwordUpdate").permitAll()


				// .anyRequest().authenticated() -> 나머지 요청들은 모두 인증되어야 한다는 뜻
				.anyRequest().authenticated()

				//jwt필터 적용
				.and()
				.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
