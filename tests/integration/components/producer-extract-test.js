import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('producer-extract', 'Integration | Component | producer extract', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{producer-extract}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#producer-extract}}
      template block text
    {{/producer-extract}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
