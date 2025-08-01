import { IBudget } from "../interfaces/budget.interface";
import { BudgetType, BudgetCategory } from "../utils/budget.utils";

export class Budget implements IBudget {
    id: number = -1;
    type: BudgetType = BudgetType.INCOME;
    amount: number = 0;
    category: BudgetCategory | null = null;
    date: Date = new Date();

    static fromJson(budgetJson : IBudget) : Budget{
        return Object.assign(new Budget(), budgetJson)
    }

    toJson() : IBudget{
        const budgetJson : IBudget = Object.assign({}, this);
        delete budgetJson.id;
        return budgetJson;
    }

}