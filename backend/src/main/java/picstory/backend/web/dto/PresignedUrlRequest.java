package picstory.backend.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PresignedUrlRequest {
    private String filename;
}