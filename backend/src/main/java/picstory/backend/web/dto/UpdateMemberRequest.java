package picstory.backend.web.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateMemberRequest {
    private String name;
    private String email;
    private String password;
    private String bio;
    private String profileImageUrl;
}