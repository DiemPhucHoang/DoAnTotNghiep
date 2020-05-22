package com.example.trungtamgiasu.service;

import com.example.trungtamgiasu.model.FreeTime;

public interface FreeTimeService {
    FreeTime getByIdFreeTime(Long id);

    FreeTime saveFreeTime(FreeTime freeTime);
}
