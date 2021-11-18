package com.codeback.web.controller;

import com.codeback.service.feedback.FeedbackService;
import com.codeback.web.dto.FeedbackSaveRequestDto;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @ApiOperation(value="피드백 저장", notes = "사용자에게 피드백을 받아서 저장")
    @PostMapping("")
    public ResponseEntity<?> saveFeedback(@RequestBody FeedbackSaveRequestDto feedbackSaveRequestDto){
        try{

            feedbackService.save(feedbackSaveRequestDto);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}
