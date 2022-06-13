import { describe, expect, it, jest } from "@jest/globals";
import model from "../model.js";

describe("model", () => {
    it("should be a function", () => {
        expect(typeof model).toBe("function");
    });

    it("should return a methods", () => {
        const methods = model({});
        expect(typeof methods.find).toBe("function");
        expect(typeof methods.create).toBe("function");
        expect(typeof methods.update).toBe("function");
        expect(typeof methods.remove).toBe("function");
    });

    it("should find all", async () => {
        const mockModel = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnThis(),
            exec: jest.fn(() => Promise.resolve([])),
        };
        const methods = model(mockModel);
        const result = await methods.find({});
        expect(result).toEqual([]);
        expect(mockModel.find).toHaveBeenCalled();
        expect(mockModel.find).toHaveBeenCalledWith({});
        expect(mockModel.lean).toHaveBeenCalled();
        expect(mockModel.exec).toHaveBeenCalled();
    });

    it("should find one", async () => {
        const mockModel = {
            find: jest.fn().mockReturnThis(),
            sort: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnThis(),
            exec: jest.fn(() => Promise.resolve({})),
        };
        const methods = model(mockModel);
        const result = await methods.find({});
        expect(result).toEqual({});
        expect(mockModel.find).toHaveBeenCalled();
        expect(mockModel.find).toHaveBeenCalledWith({});
        expect(mockModel.lean).toHaveBeenCalled();
        expect(mockModel.exec).toHaveBeenCalled();
    });

    it("should create", async () => {
        const mockModel = jest.fn().mockImplementation(() => {
            return {
                save: jest.fn(() => Promise.resolve({
                    _id: "123",
                    name: "test",
                })),
            };
        });
        const methods = model(mockModel);
        const result = await methods.create({
            name: "test",
        });
        expect(result).toEqual({
            _id: "123",
            name: "test",
        });
        expect(mockModel).toHaveBeenCalled();
        expect(mockModel).toHaveBeenCalledWith({
            name: "test",
        });
        expect(mockModel.mock.results[0].value.save).toHaveBeenCalled();
    });

    it("should update", async () => {
        const mockModel = {
            findOneAndUpdate: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnThis(),
            exec: jest.fn(() => Promise.resolve({
                _id: "123",
                name: "test",
            })),
        };
        const methods = model(mockModel);
        const result = await methods.update({
            _id: "123",
            name: "test",
        });
        expect(result).toEqual({
            _id: "123",
            name: "test",
        });
        expect(mockModel.findOneAndUpdate).toHaveBeenCalled();
        expect(mockModel.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: "123" },
            { _id: "123", name: "test" },
            { new: true },
        );
        expect(mockModel.lean).toHaveBeenCalled();
        expect(mockModel.exec).toHaveBeenCalled();
    });

    it("should remove", async () => {
        const mockModel = {
            findOneAndDelete: jest.fn().mockReturnThis(),
            lean: jest.fn().mockReturnThis(),
            exec: jest.fn(() => Promise.resolve({
                _id: "123",
                name: "test",
            })),
        };
        const methods = model(mockModel);
        const result = await methods.remove({
            _id: "123",
            name: "test",
        });
        expect(result).toEqual({
            _id: "123",
            name: "test",
        });
        expect(mockModel.findOneAndDelete).toHaveBeenCalled();
        expect(mockModel.findOneAndDelete).toHaveBeenCalledWith(
            { _id: "123", name: "test" },
        );
        expect(mockModel.lean).toHaveBeenCalled();
        expect(mockModel.exec).toHaveBeenCalled();
    });
});