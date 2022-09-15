export const validUserName = new RegExp(
  '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
);
export const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

export const validMobile = new RegExp(
  '^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'
);

export const validCompany = new RegExp(
  '^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$'
)