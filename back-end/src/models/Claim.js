class Claim {
  constructor(id, item_id, claimer_id, status, created_at, updated_at) {
    this.id = id;
    this.item_id = item_id;
    this.claimer_id = claimer_id;
    this.status = STATUS.PENDING;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

const STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export default { Claim, STATUS };
