import { helper } from '@ember/component/helper';

export function isEqual(params/*, hash*/) {
  let itemOption = params[0];
  let selectedOption = params[1];
  return (selectedOption === itemOption);
  
}

export default helper(isEqual);
