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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @GetMapping("/suggest/{idUser}")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN', 'ROLE_TUTOR')")
    public ApiResponse getClassesSuggest(@PathVariable("idUser") Long idUser) {
        try {
            List<ClassesInfoVO> classesInfoVOS = classesService.getClassesSuggest(idUser);
            return new ApiResponse(true,
                    "Get classes suggest by id " +  idUser+ " successfully", classesInfoVOS);
        } catch (Exception e) {
            return new ApiResponse(false,
                    "Get classes suggest by id" + idUser + " failed", e.toString());
        }
    }


    @GetMapping("/countDataChart")
    public ApiResponse countNumberOfClass(){
        return new ApiResponse(
                true,
                "Count number of Class",
                classesService.countNumberOfClass()
        );
    }

    @PatchMapping("")
    public ApiResponse updateClass(@RequestBody ClassesInfoVO classesInfoVO)
    {
        try {
            classesService.saveClass(classesInfoVO);
            return new ApiResponse(
                    true,
                    "Update class successfully");
        } catch (Exception e) {
            return new ApiResponse(
                    false,
                    "Update class fail: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ApiResponse getAllClass(@PageableDefault(size = 6)Pageable pageable) {
        Page<ClassesInfoVO> classesInfoVOPage = classesService.getAllClass(pageable);
        return new ApiResponse(true, "Get all classes successfully", classesInfoVOPage);
    }

    @DeleteMapping(value = "/{id}")
    public ApiResponse deleteClass(@PathVariable(value = "id")Long id)  {
        try {
            classesService.deleteClass(id);
            return new ApiResponse(
                    true,
                    "Delete class successfully");
        } catch (Exception e) {
            return new ApiResponse(
                    false,
                    "Delete class fail: " + e.getMessage());
        }
    }
    @PostMapping("/searchAll")
    public ApiResponse searchAllClass(@RequestBody SearchVO searchVO, @PageableDefault(size = 10)Pageable pageable) {
        try {
            Page<ClassesInfoVO> classesInfoVOPage = classesService.searchAllClasses(searchVO, pageable);
            return new ApiResponse(true, "Get all classes by search successfully", classesInfoVOPage);
        } catch (Exception e) {
            return new ApiResponse(false, "Get all classes by search failed", e.toString());
        }
    }

    @PostMapping("/addClass")
    public ApiResponse addClass(@RequestBody ClassesInfoVO classesInfoVO, @RequestParam("phone")String phone) {
        try {
            classesService.creatClass(classesInfoVO, phone);
            return new ApiResponse(true, "Add class successfully");
        } catch (Exception e) {
            return new ApiResponse(false, "Add class failed", e.getMessage());
        }
    }

}
