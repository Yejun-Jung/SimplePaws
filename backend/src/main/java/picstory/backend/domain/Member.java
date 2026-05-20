package picstory.backend.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    private String provider;

    public void update(String name, String email, String password, String bio, String profileImageUrl) {
        this.name = name;
        this.email = email;
        if (password != null && !password.isEmpty()) {
            this.password = password;
        }
        this.bio = bio;
        this.profileImageUrl = profileImageUrl;
    }
}