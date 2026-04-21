package picstory.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import picstory.backend.domain.Member;
import picstory.backend.domain.Post;
import picstory.backend.repository.MemberRepository;
import picstory.backend.repository.PostRepository;
import picstory.backend.web.dto.CreatePostRequest;
import picstory.backend.web.dto.PostResponse;
import picstory.backend.web.dto.UpdatePostRequest;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    public List<PostResponse> getPosts(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));
        return postRepository.findAllByMemberOrderByCreatedAtDesc(member)
                .stream()
                .map(PostResponse::from)
                .collect(Collectors.toList());
    }

    public PostResponse getPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시물입니다."));
        return PostResponse.from(post);
    }

    // 게시물 생성
    @Transactional
    public PostResponse createPost(String email, CreatePostRequest request) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        Post post = Post.builder()
                .member(member)
                .date(request.getDate())
                .title(request.getTitle())
                .content(request.getContent())
                .imageUrl(request.getImageUrl())
                .category(request.getCategory())
                .customCategory(request.getCustomCategory()) // 🔥 이 부분 추가
                .build();

        return PostResponse.from(postRepository.save(post));
    }

    // 게시물 수정
    @Transactional
    public PostResponse updatePost(Long postId, UpdatePostRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시물입니다."));

        // 🔥 파라미터 마지막에 request.getCustomCategory() 추가
        post.update(request.getTitle(), request.getContent(), request.getDate(), request.getImageUrl(), request.getCategory(), request.getCustomCategory());
        return PostResponse.from(postRepository.save(post));
    }

    @Transactional
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }
}