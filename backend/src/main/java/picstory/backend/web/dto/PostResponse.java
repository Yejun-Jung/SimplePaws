package picstory.backend.web.dto;

import lombok.Builder;
import lombok.Getter;
import picstory.backend.domain.Post;
import picstory.backend.domain.PostCategory;

import java.time.LocalDateTime;

@Getter
@Builder
public class PostResponse {
    private Long id;
    private String date;
    private String title;
    private String content;
    private String imageUrl;
    private PostCategory category;

    // 🔥 클라이언트로 응답할 때 커스텀 카테고리도 함께 보내주기
    private String customCategory;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PostResponse from(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .date(post.getDate())
                .title(post.getTitle())
                .content(post.getContent())
                .imageUrl(post.getImageUrl())
                .category(post.getCategory())
                .customCategory(post.getCustomCategory()) // 🔥 이 부분 추가
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }
}