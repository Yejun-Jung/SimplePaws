package picstory.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import picstory.backend.domain.Member;

@Getter
@AllArgsConstructor
public class MemberResponse {

    private Long id;
    private String email;
    private String name;

    public static MemberResponse from(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getEmail(),
                member.getName()
        );
    }
}