package picstory.backend.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import picstory.backend.domain.PostCategory;

@Getter
@NoArgsConstructor
public class UpdatePostRequest {

    private String title;
    private String content;
    private String imageUrl;
    private PostCategory category;
}