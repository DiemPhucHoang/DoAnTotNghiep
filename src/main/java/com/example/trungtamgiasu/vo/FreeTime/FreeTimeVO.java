package com.example.trungtamgiasu.vo.FreeTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FreeTimeVO {
    private boolean morning;

    private boolean afternoon;

    private boolean evening;

   private String dayName;

}
