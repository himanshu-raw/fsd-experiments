package com.example.exp7.user;

import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InMemoryUserStore {

    private final Map<String, AppUser> users = new ConcurrentHashMap<>();
    private final PasswordEncoder passwordEncoder;

    public InMemoryUserStore(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    void seedUsers() {
        save("admin", "admin123", Set.of(AppRole.ADMIN, AppRole.USER));
        save("user", "user123", Set.of(AppRole.USER));
    }

    public Optional<AppUser> findByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }

    public AppUser save(String username, String rawPassword, Set<AppRole> roles) {
        if (users.containsKey(username)) {
            throw new IllegalArgumentException("Username already exists");
        }

        AppUser user = new AppUser(username, passwordEncoder.encode(rawPassword), roles);
        users.put(username, user);
        return user;
    }
}
