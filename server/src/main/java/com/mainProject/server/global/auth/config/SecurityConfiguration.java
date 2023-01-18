package com.mainProject.server.global.auth.config;

import com.mainProject.server.global.auth.filter.JwtAuthenticationFilter;
import com.mainProject.server.global.auth.handler.MemberAuthenticationFailureHandler;
import com.mainProject.server.global.auth.handler.MemberAuthenticationSuccessHandler;
import com.mainProject.server.global.auth.jwt.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Slf4j
@Configuration
@EnableWebSecurity(debug = true) //테스트 용으로
@RequiredArgsConstructor
public class SecurityConfiguration {
//    private final CustomAuthorityUtils authorityUtils;

    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;
    private final AuthenticationManager authenticationManager;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().disable()
                .and()
                .csrf().disable()
                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
//                .httpBasic().disable()
//                .exceptionHandling()
//                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
//                .accessDeniedHandler(new MemberAccessDeniedHandler())
////                .and()
                .apply(new CustomFilterConfigurer())   // (1)
                .and()
//                /*.logout().logoutUrl("/members/logout")
//                .logoutSuccessUrl("/members/login")
//                .logoutSuccessHandler(new MembersLogoutSuccessHandler())
//                .deleteCookies("JSESSIONID")
//                .addLogoutHandler(new MembersLogoutHandler())*/
//                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate,authenticationManager ), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authorize -> authorize
                        // 회원 관련 권한
                        .antMatchers(HttpMethod.PATCH, "/members/*").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/members/*").hasAnyRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/members/*").hasRole("USER")
                        // 컨텐츠 관련 권한
                        .antMatchers(HttpMethod.GET, "/crawlings/contents").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/contents/*").hasRole("ADMIN")
                        .antMatchers(HttpMethod.POST, "/comments/**").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/contents/*/comments/*").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/comments/*").hasRole("USER")
                        // 찜하기, 인생작, 추천, 비추천 권한
                        .antMatchers(HttpMethod.POST, "/comments/*/choice").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/choice/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/comments/*/favorite").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/favorite/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/comments/*/deprecate").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/deprecate/**").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/comments/*/recommend").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/recommend/**").hasRole("USER")
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {  // (2-1)
        @Override
        public void configure(HttpSecurity builder) throws Exception {  // (2-2)
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);  // (2-3)

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(jwtTokenProvider, redisTemplate, authenticationManager);
//            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");          // (2-5)
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());  // (3) 추가
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());  // (4) 추가

//            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);  // (2) 추가

            builder
                    .addFilter(jwtAuthenticationFilter);
//                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);   // (3)추가 차후 수정
        }
    }
}
