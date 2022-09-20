export const validUserName = new RegExp(
  // '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
  // '^[a-z A-Z]+$'
  '[^\s]'
);
export const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
  // "^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
);

export const validMobile = new RegExp(
  // '^([0|\+[0-9]{1,5})?([6-9][0-9]{9})$'
  '^([0|\+[0-9])([0-9]{9})$'
);

export const validCompany = new RegExp(
  // '^[A-Z]([a-zA-Z0-9]|[- @\.#&!])*$'
  '^[a-z A-Z]+$'
)