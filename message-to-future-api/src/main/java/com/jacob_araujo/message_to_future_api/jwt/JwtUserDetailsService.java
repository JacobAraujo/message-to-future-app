package com.jacob_araujo.message_to_future_api.jwt;

import com.jacob_araujo.message_to_future_api.entity.User;
import com.jacob_araujo.message_to_future_api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userService.searchByUsername(username);
        return new JwtUserDetails(user);
    }

    public JwtToken getTokenAuthenticated(String username){
        User.Role role = userService.searchRoleByUsername(username);
        return JwtUtils.createToken(username, role.name().substring("ROLE_".length()));
    }
}
