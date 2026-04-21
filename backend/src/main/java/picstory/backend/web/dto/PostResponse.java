package picstory.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import picstory.backend.domain.Post;
import picstory.backend.domain.PostCategory;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PostResponse {

    private Long id;
    private String date;        // ← 추가
    private String title;
    private String content;
    private String imageUrl;
    private PostCategory category;
    private LocalDateTime createdAt;

    public static PostResponse from(Post post) {
        return new PostResponse(
                post.getId(),
                post.getDate(),         // ← 추가
                post.getTitle(),
                post.getContent(),
                post.getImageUrl(),
                post.getCategory(),
                post.getCreatedAt()
        );
    }
}