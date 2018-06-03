import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('approve-cooperative-modal', 'Integration | Component | approve cooperative modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{approve-cooperative-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#approve-cooperative-modal}}
      template block text
    {{/approve-cooperative-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
