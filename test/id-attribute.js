var expect = require('chai').expect,
    Model = require('../lib/model');

describe('Id attribute', function () {

    describe('Default id attribute', function () {

        it('should add id attribute if it absent in attributes declaration', function () {
            var model = new Model();
            expect(model.attributes.id).to.be.an.instanceof(Model.attributeTypes.Id);
            expect(model.getId()).to.be.null;
        });

        it('should get "id" property as id attribute from  initial data', function () {
            var model = new Model({
                id: 1
            });
            expect(model.getId()).to.equal(1);
        });
    });

    describe('Id attribute declaration', function () {

        it('should set declared attribute as id attribute', function () {
            var ModelClass, model;

            ModelClass = Model.inherit({
                attributes: {
                    customId: Model.attributeTypes.Id
                }
            });

            model = new ModelClass({
                customId: 1
            });
            expect(model.getId()).to.equal(1);
        });

        it('should be able to change default id attribute type', function () {
            var ModelClass, model;

            ModelClass = Model.inherit({
                attributes: {
                    customId: Model.attributeTypes.Id.inherit({
                        type: String
                    })
                }
            });

            model = new ModelClass({
                customId: '1'
            });

            expect(model.getId()).to.equal('1');
        });
    });

    describe('Id#isEqual', function () {
        it('should correctly check equality with null', function () {
            var model = new Model();
            expect(model.attributes.id.isEqual(null)).to.be.true;
        });

        it('should correctly check equality with non-null', function () {
            var model = new Model({
                id: 1
            });

            expect(model.attributes.id.isEqual(1)).to.be.true;
            expect(model.attributes.id.isEqual('1')).to.be.true;
        });
    });

    describe('Legacy', function () {

        it('should support old interface', function () {
            var model = new Model(1);
            expect(model.getId()).to.equal(1);

            model = new Model({
                id: 1
            });
            expect(model.id).to.equal(1);
        });

        it('should change id property when id attribute has changed', function () {
            var model = new Model(1);
            model.set('id', 2);
            model.ready().then(function () {
                expect(model.id).to.equal(2);
            });

        });

    });


});
