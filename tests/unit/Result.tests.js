var expect = require('chai').expect;

var Result = require('../../lib/Result');
var List = require('../../lib/List');
var LimitStatement = require('../../lib/parameters/LimitStatement');

describe('list', function () {
    it('sss', function () {
        var a = new List([1, 2, 3], 23, new LimitStatement(99, 88));

        expect(a.toObject()).to.deep.equal({
            entries: [1, 2, 3],
            overallCount: 23,
            limit: 99,
            offset: 88
        });
    });

    it('sss', function () {
        var a = new List([1, 2, 3], 23);

        expect(a.toObject()).to.deep.equal({
            entries: [1, 2, 3],
            overallCount: 23,
            limit: null,
            offset: null
        });
    });
});

describe('result', function () {
    it('sss', function () {
        var a = new Result({a: 1}, Result.CONTENT_TYPE_JSON, 400);

        expect(a.content()).to.deep.equal({a: 1});
        expect(a.contentType()).to.equal('application/json');
        expect(a.statusCode()).to.equal(400);
    });

    it('bbb', function () {
        var list = new List([1, 2, 3], 23, new LimitStatement(99, 88));
        var a = new Result(list, Result.CONTENT_TYPE_JSON, 400);

        expect(a.content()).to.deep.equal({
            entries: [1, 2, 3],
            overallCount: 23,
            limit: 99,
            offset: 88
        });
        expect(a.contentType()).to.equal('application/json');
        expect(a.statusCode()).to.equal(400);
    })
});