package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.service.ClassesService;
import com.example.trungtamgiasu.vo.SearchVO;
import com.example.trungtamgiasu.vo.classes.ClassesInfoVO;
import com.example.trungtamgiasu.vo.classes.ClassesVO;
import com.example.trungtamgiasu.vo.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/class")
public class ClassesController {

    @Autowired
    private ClassesService classesService;

    @PostMapping()
    public ApiResponse createClass(@RequestBody ClassesVO classesVO) {
        return new ApiResponse(
                true,
                "Create class successfully",
                classesService.createClass(classesVO));
    }

    @GetMapping()
    public ApiResponse getAll(@PageableDefault(size = 6)Pageable pageable) {
        Page<ClassesInfoVO> classesInfoVOPage = classesService.getAll(pageable);
        return new ApiResponse(
                true,
                "Get all classes successfully",
                classesInfoVOPage);
    }

    @PostMapping("/search")
    public ApiResponse getAllBySearch(@RequestBody SearchVO searchVO, @PageableDefault(size = 6)Pageable pageable) {
        Page<ClassesInfoVO> classesInfoVOPage = classesService.searchClasses(searchVO, pageable);
        return new ApiResponse(
                true,
                "Get all classes by search successfully",
                classesInfoVOPage);
    }

    @GetMapping("/{idClass}")
    public ApiResponse getClassesById(@PathVariable("idClass") Long id) {
        try {
            ClassesInfoVO classesInfoVO = classesService.getClassesById(id);
            return new ApiResponse(true, "Get classes by " +  id + " successfully", classesInfoVO);
        } catch (Exception e) {
            return new ApiResponse(false, "Get classes by " + id + " failed");
        }
    }


}
