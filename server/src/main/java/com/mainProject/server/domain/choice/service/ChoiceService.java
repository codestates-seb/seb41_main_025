package com.mainProject.server.domain.choice.service;

import com.mainProject.server.domain.choice.entity.Choice;
import com.mainProject.server.domain.choice.repository.ChoiceRepository;
import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.repository.ContentRepository;
import com.mainProject.server.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChoiceService {

    private final ChoiceRepository choiceRepository;
    private final ContentRepository contentRepository;

    public Choice pickChoice(Member member, Content content) {
        Choice choice = findByMemberAndContent(member, content);
        choice.setMember(member);
        choice.setContent(content);

        if(choice.getChoiceSelected() != Boolean.TRUE) {
            choice.setChoiceSelected(Boolean.TRUE);
            content.setChoiceCount(content.getChoiceCount() + 1);
        } else {
            choice.setChoiceSelected(Boolean.FALSE);
            content.setChoiceCount(content.getChoiceCount() - 1);
        }

        contentRepository.save(content);
        choiceRepository.save(choice);

        return choice;
    }

    public Choice findByMemberAndContent(Member member, Content content) {
        Optional<Choice> optionalChoice =
                this.choiceRepository.findByMemberAndContent(member,content);

        if(optionalChoice.isPresent()) {
            return optionalChoice.get();
        } else {
            return new Choice();
        }
    }


}
