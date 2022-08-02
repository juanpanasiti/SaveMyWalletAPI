import { Document } from "mongoose";
import { PurchaseModel } from "../interfaces/purchase.interfaces";

export type PurchaseDocument = Document<unknown, any, PurchaseModel> & PurchaseModel