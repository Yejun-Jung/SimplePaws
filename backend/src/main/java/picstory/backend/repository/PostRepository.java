package picstory.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import picstory.backend.domain.Post;
import picstory.backend.domain.Member;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByMemberOrderByCreatedAtDesc(Member member);

    // 기존 코드 내부에 아래 메서드를 추가해 주세요.
    void deleteByMember(Member member);
}