package com.codeback.service.feedback;

import com.codeback.domain.feedback.Feedback;
import com.codeback.domain.feedback.FeedbackRepository;
import com.codeback.web.dto.FeedbackSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;


    public void save(FeedbackSaveRequestDto feedbackSaveRequestDto) {
        Feedback feedback = Feedback.builder()
                .content(feedbackSaveRequestDto.getContent())
                .build();
        feedbackRepository.save(feedback);

    }
}
