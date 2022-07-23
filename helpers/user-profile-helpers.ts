import { EditableUserProfile } from "../interfaces/user-profile.interfaces";

export const filterPayloadField = (
    payload: EditableUserProfile,
    allowedProfile: EditableUserProfile
): void => {
    if (payload.asociatedCreditCards) {
        allowedProfile.asociatedCreditCards = payload.asociatedCreditCards;
    }
    if (payload.nextPaymentDate) {
        allowedProfile.nextPaymentDate = payload.nextPaymentDate;
    }
    if (payload.paymentAmount) {
        allowedProfile.paymentAmount = payload.paymentAmount;
    }
    if (payload.globalCycleAmountAlert) {
        allowedProfile.globalCycleAmountAlert = payload.globalCycleAmountAlert;
    }
    if (payload.activeGlobalCycleAmountAlert) {
        allowedProfile.activeGlobalCycleAmountAlert = payload.activeGlobalCycleAmountAlert;
    }
};
