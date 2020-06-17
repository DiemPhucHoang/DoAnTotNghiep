package com.example.trungtamgiasu.mapper;

import com.example.trungtamgiasu.model.District;
import com.example.trungtamgiasu.vo.District.DistrictVO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DistrictMapper {
    District toDistrict(DistrictVO districtVO);

    DistrictVO toDistrictVO(District district);

    List<DistrictVO> toDistrictsVOList(List<District> districts);
}
