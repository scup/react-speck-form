const TYPES = {
  array: [],
  string: '',
  number: 0,
  bool: true,
  func: () => {},
  object: {},
  oneOf: "____"
};

export default (specification) => {

  let executeValidator = specification.validator || specification;

  for (let typeName in TYPES) {
    let errors;
    errors = executeValidator({"name": TYPES[typeName]}, "name");
    const isReqRegex = new RegExp('Required undefined (.*) was not specified');
    const isRequered = isReqRegex.test(executeValidator({"name": null}, "name"));

    if ( !errors ) {
      return {
        "name": typeName,
        "required": isRequered
      };
    }
    switch(true) {
      case /expected one of/.test(errors):
        let oneOfArray = /expected one of (\[.*\])/.exec(errors);
        if (oneOfArray && oneOfArray[1]) {
          return {
            name: 'oneOf',
            "required": isRequered,
            options: JSON.parse(oneOfArray[1]) || []
          };
        }
        break;
    }
  }
};
