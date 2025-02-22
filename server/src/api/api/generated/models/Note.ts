/* tslint:disable */
/* eslint-disable */
/**
 * WebNotes API
 * API for managing notes in the WebNotes app
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { Bookmark } from './Bookmark';
import {
    BookmarkFromJSON,
    BookmarkFromJSONTyped,
    BookmarkToJSON,
    BookmarkToJSONTyped,
} from './Bookmark';

/**
 * 
 * @export
 * @interface Note
 */
export interface Note {
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    _id: string;
    /**
     * 
     * @type {Bookmark}
     * @memberof Note
     */
    bookmark: Bookmark;
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    text: string;
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    updatedAt: string;
    /**
     * 
     * @type {string}
     * @memberof Note
     */
    createdAt: string;
}

/**
 * Check if a given object implements the Note interface.
 */
export function instanceOfNote(value: object): value is Note {
    if (!('_id' in value) || value['_id'] === undefined) return false;
    if (!('bookmark' in value) || value['bookmark'] === undefined) return false;
    if (!('text' in value) || value['text'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    return true;
}

export function NoteFromJSON(json: any): Note {
    return NoteFromJSONTyped(json, false);
}

export function NoteFromJSONTyped(json: any, ignoreDiscriminator: boolean): Note {
    if (json == null) {
        return json;
    }
    return {
        
        '_id': json['_id'],
        'bookmark': BookmarkFromJSON(json['bookmark']),
        'text': json['text'],
        'updatedAt': json['updatedAt'],
        'createdAt': json['createdAt'],
    };
}

export function NoteToJSON(json: any): Note {
    return NoteToJSONTyped(json, false);
}

export function NoteToJSONTyped(value?: Note | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        '_id': value['_id'],
        'bookmark': BookmarkToJSON(value['bookmark']),
        'text': value['text'],
        'updatedAt': value['updatedAt'],
        'createdAt': value['createdAt'],
    };
}

