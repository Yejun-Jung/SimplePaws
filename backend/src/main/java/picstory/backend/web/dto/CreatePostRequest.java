package picstory.backend.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import picstory.backend.domain.PostCategory;

@Getter
@NoArgsConstructor
public class CreatePostRequest {

    private String title;
    private String content;
    private String imageUrl;
    private PostCategory category;
}