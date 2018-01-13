import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chart-container-sections-filter', 'Integration | Component | chart container sections filter', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{chart-container-sections-filter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#chart-container-sections-filter}}
      template block text
    {{/chart-container-sections-filter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
