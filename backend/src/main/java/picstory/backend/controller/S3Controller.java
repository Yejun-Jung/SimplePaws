package picstory.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import picstory.backend.service.S3Service;
import picstory.backend.web.dto.PresignedUrlRequest;
import picstory.backend.web.dto.PresignedUrlResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/s3")
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/presigned")
    public ResponseEntity<PresignedUrlResponse> generatePresignedUrl(@RequestBody PresignedUrlRequest request) {
        String presignedUrl = s3Service.getPresignedUrl(request.getFilename());
        String fileUrl = s3Service.getFileUrl(presignedUrl);
        return ResponseEntity.ok(new PresignedUrlResponse(presignedUrl, fileUrl));
    }
}