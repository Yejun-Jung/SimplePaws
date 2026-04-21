package picstory.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Presigner s3Presigner;
    private final String bucket;

    public S3Service(S3Presigner s3Presigner, @Value("${cloud.aws.s3.bucket}") String bucket) {
        this.s3Presigner = s3Presigner;
        this.bucket = bucket;
    }

    public String getPresignedUrl(String filename) {
        String uniqueFileName = createUniqueFileName(filename);

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucket)
                .key(uniqueFileName)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(5))
                .putObjectRequest(objectRequest)
                .build();

        PresignedPutObjectRequest presignedRequest = s3Presigner.presignPutObject(presignRequest);
        return presignedRequest.url().toString();
    }

    public String getFileUrl(String presignedUrl) {
        return presignedUrl.split("\\?")[0];
    }

    private String createUniqueFileName(String filename) {
        return UUID.randomUUID() + "_" + filename;
    }
}