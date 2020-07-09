package com.example.trungtamgiasu.controller;

import com.example.trungtamgiasu.model.Classes;
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
        try {
            Classes classes = classesService.createClass(classesVO);
            return new ApiResponse(true, "Create class successfully", classes);
        } catch (Exception e) {
            return new ApiResponse(false, "Create class failed", e.toString());
        }

    }

    @GetMapping()
    public ApiResponse getAll(@PageableDefault(size = 6)Pageable pageable) {
        Page<ClassesInfoVO> classesInfoVOPage = classesService.getAll(pageable);
        return new ApiResponse(true, "Get all classes successfully", classesInfoVOPage);
    }

    @PostMapping("/search")
    public ApiResponse getAllBySearch(@RequestBody SearchVO searchVO, @PageableDefault(size = 6)Pageable pageable) {
        try {
            Page<ClassesInfoVO> classesInfoVOPage = classesService.searchClasses(searchVO, pageable);
            return new ApiResponse(true, "Get all classes by search successfully", classesInfoVOPage);
        } catch (Exception e) {
            return new ApiResponse(false, "Get all classes by search failed", e.toString());
        }
    }

    @GetMapping("/{idClass}")
    public ApiResponse getClassesById(@PathVariable("idClass") Long id) {
        try {
            ClassesInfoVO classesInfoVO = classesService.getClassesById(id);
            return new ApiResponse(true, "Get classes by " +  id + " successfully", classesInfoVO);
        } catch (Exception e) {
            return new ApiResponse(false, "Get classes by " + id + " failed", e.toString());
        }
    }

    @GetMapping("/top4")
    public ApiResponse getTop4() {
        return new ApiResponse(true, "Get top 4 classes successfully", classesService.getTop4());
    }

    @GetMapping("/similar/{idClass}")
    public ApiResponse getTop3ByClassTeach(@PathVariable("idClass") Long idClass) {
        return new ApiResponse(
                true,
                "Get top 3 by class teach successfully",
                classesService.getTop3ByClassTeach(idClass));
    }

}
