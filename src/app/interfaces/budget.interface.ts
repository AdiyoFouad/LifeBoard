import { BudgetCategory, BudgetType } from "../utils/budget.utils";

export interface IBudget {
    id? : number,
    type : BudgetType,
    amount : number,
    category : BudgetCategory | null,
    date : Date
}
