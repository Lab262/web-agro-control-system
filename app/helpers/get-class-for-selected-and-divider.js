import { helper } from '@ember/component/helper';

export function getClassForSelectedAndDivider(params/*, hash*/) {
  let itemOption = params[0];
  let selectedOption = params[1];
  var styleClass = "";

  if (selectedOption === itemOption.name) {
    styleClass = styleClass + " is-selected-option";
  } 

  if (itemOption.hasDivider) {
    styleClass = styleClass + " divider";  
  }

  return styleClass;
}

export default helper(getClassForSelectedAndDivider);
