import Ember from 'ember';

export function cleanSpecialcharacters(params, options) {
  let string = params[0];
  let cleanString = string.replace(/\s/g,'').replace(/[^a-zA-Z ]/g, "");
  return cleanString;
}
export default Ember.Helper.helper(cleanSpecialcharacters);
