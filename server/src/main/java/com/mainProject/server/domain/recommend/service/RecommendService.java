package com.mainProject.server.domain.recommend.service;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.repository.ContentRepository;
import com.mainProject.server.domain.member.entity.Member;
import com.mainProject.server.domain.recommend.entity.Deprecate;
import com.mainProject.server.domain.recommend.entity.Recommend;
import com.mainProject.server.domain.recommend.repository.DeprecateRepository;
import com.mainProject.server.domain.recommend.repository.RecommendRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendService {
    private final RecommendRepository recommendRepository;
    private final ContentRepository contentRepository;
    private final DeprecateRepository deprecateRepository;


    public Recommend pickRecommend(Member member, Content content) {
        Recommend recommend = findByRecommendMemberAndContent(member, content);
        Deprecate deprecate = findByDeprecateMemberAndContent(member, content);
        recommend.setMember(member);
        recommend.setContent(content);

        if (recommend.getRecommendSelected() != Boolean.TRUE) {
            recommend.setRecommendSelected(Boolean.TRUE);
            content.setRecommendCount(content.getRecommendCount() + 1);
            if(deprecate.getDeprecatedSelected() == Boolean.TRUE) {
                deprecate.setDeprecatedSelected(Boolean.FALSE);
                content.setDeprecateCount(content.getDeprecateCount() -1);
            }
        } else {
            recommend.setRecommendSelected(Boolean.FALSE);
            content.setRecommendCount(content.getRecommendCount() - 1);
        }

        contentRepository.save(content);
        recommendRepository.save(recommend);
        deprecateRepository.save(deprecate);

        return recommend;
    }

    public Deprecate pickDeprecate(Member member, Content content) {
        Deprecate deprecate = findByDeprecateMemberAndContent(member, content);
        Recommend recommend = findByRecommendMemberAndContent(member, content);
        deprecate.setMember(member);
        deprecate.setContent(content);

        //추천버튼과 비추천 버튼이 모두 True가 아닌경우 >> 비추천만 count
        //추천 버튼이 True이면서 비추천 버튼이 True가 아닌 경우 >> 추천은 -1, 비추천은 count
        if (deprecate.getDeprecatedSelected() != Boolean.TRUE) {
            deprecate.setDeprecatedSelected(Boolean.TRUE);
            content.setDeprecateCount(content.getDeprecateCount() + 1);

            if (recommend.getRecommendSelected() == Boolean.TRUE) {
                recommend.setRecommendSelected(Boolean.FALSE);
                content.setRecommendCount(content.getRecommendCount() - 1);
            }
        } else {
            deprecate.setDeprecatedSelected(Boolean.FALSE);
            content.setDeprecateCount(content.getDeprecateCount() -1);
        }

        contentRepository.save(content);
        deprecateRepository.save(deprecate);
        recommendRepository.save(recommend);

        return deprecate;
    }


    public Recommend findByRecommendMemberAndContent(Member member, Content content) {
        Optional<Recommend> optionalRecommend = this.recommendRepository.findByMemberAndContent(member, content);

        if (optionalRecommend.isPresent()) {
            return optionalRecommend.get();
        } else {
            return new Recommend();
        }
    }

    public Deprecate findByDeprecateMemberAndContent(Member member, Content content) {
        Optional<Deprecate> findDeprecate = this.deprecateRepository.findByMemberAndContent(member, content);

        if (findDeprecate.isPresent()) {
            return findDeprecate.get();
        } else {
            return new Deprecate();
        }
    }

}
