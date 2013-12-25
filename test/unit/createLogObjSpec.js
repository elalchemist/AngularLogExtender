/**
 * Created by ferron on 12/24/13.
 */


describe('Log Object Create Method Spec', function () {


    it('should return an empty resultSet if an empty method array is passed', function () {
        var aMethods = [],
            myLog = {};
        expect(createLogObj(myLog, aMethods)).toEqual({});
    });

    it('should return an empty resultSet if a null method array is passed', function () {
        var aMethod = null,
            mYLog = {};
        expect(createLogObj(mYLog, aMethod)).toEqual({});
    });

    it('should return resultSet with method array objects', function () {
        var myLog = {},
            resultSet = {};
        angular.forEach(allowedMethods, function(val, idx) {
            myLog[val] = idx;
        });
        resultSet = createLogObj(myLog, allowedMethods);
        angular.forEach(resultSet, function (idx, method) {
           expect(allowedMethods[idx]).toBe(method);
        });
    });


    describe('Advance Usage of the createLogObject with Function + Params', function () {
        var utils;

        beforeEach(function () {
            utils = {
                myLog : {},
                resultSet : {},
                myFunc : function () {
                    var params = Array.prototype.slice.call(arguments);
                    return params.reduce(function(a, b) { return a + b; });
                }
            };
            spyOn(utils, 'myFunc').andCallThrough();

            angular.forEach(allowedMethods, function(val, idx) {
                utils.myLog[val] = idx;
            });

            utils.resultSet = createLogObj(utils.myLog, allowedMethods, utils.myFunc, [1,2,3,4,5]);
        });

        it('should call myFunc method', function () {
            expect(utils.myFunc).toHaveBeenCalled();
        });

        it('should call myFunc n times', function () {
            expect(utils.myFunc.callCount).toBe(allowedMethods.length);
        });

        it('should return resultSet with result of function invocation', function (){

            angular.forEach(utils.resultSet, function (val, method) {
                // 15 in this case represent the total of the flatten array [1,2,3,4,5] := 1+2+3+4+5 = 15
                expect(allowedMethods[val-15]).toBe(method);
            });
        });


    });
});