package picstory.backend.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    private String date;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private PostCategory category;

    // 🔥 사용자가 직접 입력한 기타 카테고리를 저장할 컬럼 추가
    private String customCategory;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // 🔥 업데이트 시 customCategory도 반영되도록 파라미터 추가
    public void update(String title, String content, String date, String imageUrl, PostCategory category, String customCategory) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.imageUrl = imageUrl;
        this.category = category;
        this.customCategory = customCategory;
    }
}