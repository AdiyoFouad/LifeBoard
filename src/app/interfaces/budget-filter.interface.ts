import { BudgetType } from "../utils/budget.utils";

export interface IBudgetFilter {
    range : {
        startDate : Date | undefined,
        endDate : Date | undefined,
    },
    type : BudgetType | 'All'
}
