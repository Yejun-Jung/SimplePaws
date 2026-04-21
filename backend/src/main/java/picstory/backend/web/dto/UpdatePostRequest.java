package picstory.backend.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import picstory.backend.domain.PostCategory;

@Getter
@NoArgsConstructor
public class UpdatePostRequest {
    private String date;
    private String title;
    private String content;
    private String imageUrl;
    private PostCategory category;

    // 🔥 프론트에서 넘어오는 기타 카테고리 텍스트를 받기 위해 추가
    private String customCategory;
}