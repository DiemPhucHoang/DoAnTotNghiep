package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.FreeTime;
import com.example.trungtamgiasu.vo.FreeTime.FreeTimeVO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FreeTimeMapper {
    FreeTime toFreeTime(FreeTimeVO freeTimeVO);

    FreeTimeVO toFreeTimeVO(FreeTime freeTime);
}
