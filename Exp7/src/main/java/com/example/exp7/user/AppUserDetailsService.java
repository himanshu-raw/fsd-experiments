package com.example.exp7.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final InMemoryUserStore userStore;

    public AppUserDetailsService(InMemoryUserStore userStore) {
        this.userStore = userStore;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userStore.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        return new User(
                appUser.getUsername(),
                appUser.getEncodedPassword(),
                toAuthorities(appUser.getRoles())
        );
    }

    public UserDetails register(String username, String rawPassword, String requestedRole) {
        AppRole role = requestedRole == null || requestedRole.isBlank()
                ? AppRole.USER
                : AppRole.valueOf(requestedRole.trim().toUpperCase());

        AppUser saved = userStore.save(username, rawPassword, Set.of(role));
        return new User(saved.getUsername(), saved.getEncodedPassword(), toAuthorities(saved.getRoles()));
    }

    private Set<GrantedAuthority> toAuthorities(Set<AppRole> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toSet());
    }
}
