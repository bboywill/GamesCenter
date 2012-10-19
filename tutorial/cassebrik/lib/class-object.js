/*

Date : 29/09/2012

Auteur  : Abraham TEWA
Version : alpha-2

GNU LESSER GENERAL PUBLIC LICENSE

Version 3, 29 June 2007

Copyright © 2007 Free Software Foundation, Inc. <http://fsf.org/>

Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed.

This version of the GNU Lesser General Public License incorporates the terms and conditions of version 3 of the GNU General Public License, supplemented by the additional permissions listed below.
0. Additional Definitions.

As used herein, “this License” refers to version 3 of the GNU Lesser General Public License, and the “GNU GPL” refers to version 3 of the GNU General Public License.

“The Library” refers to a covered work governed by this License, other than an Application or a Combined Work as defined below.

An “Application” is any work that makes use of an interface provided by the Library, but which is not otherwise based on the Library. Defining a subclass of a class defined by the Library is deemed a mode of using an interface provided by the Library.

A “Combined Work” is a work produced by combining or linking an Application with the Library. The particular version of the Library with which the Combined Work was made is also called the “Linked Version”.

The “Minimal Corresponding Source” for a Combined Work means the Corresponding Source for the Combined Work, excluding any source code for portions of the Combined Work that, considered in isolation, are based on the Application, and not on the Linked Version.

The “Corresponding Application Code” for a Combined Work means the object code and/or source code for the Application, including any data and utility programs needed for reproducing the Combined Work from the Application, but excluding the System Libraries of the Combined Work.
1. Exception to Section 3 of the GNU GPL.

You may convey a covered work under sections 3 and 4 of this License without being bound by section 3 of the GNU GPL.
2. Conveying Modified Versions.

If you modify a copy of the Library, and, in your modifications, a facility refers to a function or data to be supplied by an Application that uses the facility (other than as an argument passed when the facility is invoked), then you may convey a copy of the modified version:

    a) under this License, provided that you make a good faith effort to ensure that, in the event an Application does not supply the function or data, the facility still operates, and performs whatever part of its purpose remains meaningful, or
    b) under the GNU GPL, with none of the additional permissions of this License applicable to that copy.

3. Object Code Incorporating Material from Library Header Files.

The object code form of an Application may incorporate material from a header file that is part of the Library. You may convey such object code under terms of your choice, provided that, if the incorporated material is not limited to numerical parameters, data structure layouts and accessors, or small macros, inline functions and templates (ten or fewer lines in length), you do both of the following:

    a) Give prominent notice with each copy of the object code that the Library is used in it and that the Library and its use are covered by this License.
    b) Accompany the object code with a copy of the GNU GPL and this license document.

4. Combined Works.

You may convey a Combined Work under terms of your choice that, taken together, effectively do not restrict modification of the portions of the Library contained in the Combined Work and reverse engineering for debugging such modifications, if you also do each of the following:

    a) Give prominent notice with each copy of the Combined Work that the Library is used in it and that the Library and its use are covered by this License.
    b) Accompany the Combined Work with a copy of the GNU GPL and this license document.
    c) For a Combined Work that displays copyright notices during execution, include the copyright notice for the Library among these notices, as well as a reference directing the user to the copies of the GNU GPL and this license document.
    d) Do one of the following:
        0) Convey the Minimal Corresponding Source under the terms of this License, and the Corresponding Application Code in a form suitable for, and under terms that permit, the user to recombine or relink the Application with a modified version of the Linked Version to produce a modified Combined Work, in the manner specified by section 6 of the GNU GPL for conveying Corresponding Source.
        1) Use a suitable shared library mechanism for linking with the Library. A suitable mechanism is one that (a) uses at run time a copy of the Library already present on the user's computer system, and (b) will operate properly with a modified version of the Library that is interface-compatible with the Linked Version.
    e) Provide Installation Information, but only if you would otherwise be required to provide such information under section 6 of the GNU GPL, and only to the extent that such information is necessary to install and execute a modified version of the Combined Work produced by recombining or relinking the Application with a modified version of the Linked Version. (If you use option 4d0, the Installation Information must accompany the Minimal Corresponding Source and Corresponding Application Code. If you use option 4d1, you must provide the Installation Information in the manner specified by section 6 of the GNU GPL for conveying Corresponding Source.)

5. Combined Libraries.

You may place library facilities that are a work based on the Library side by side in a single library together with other library facilities that are not Applications and are not covered by this License, and convey such a combined library under terms of your choice, if you do both of the following:

    a) Accompany the combined library with a copy of the same work based on the Library, uncombined with any other library facilities, conveyed under the terms of this License.
    b) Give prominent notice with the combined library that part of it is a work based on the Library, and explaining where to find the accompanying uncombined form of the same work.

6. Revised Versions of the GNU Lesser General Public License.

The Free Software Foundation may publish revised and/or new versions of the GNU Lesser General Public License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns.

Each version is given a distinguishing version number. If the Library as you received it specifies that a certain numbered version of the GNU Lesser General Public License “or any later version” applies to it, you have the option of following the terms and conditions either of that published version or of any later version published by the Free Software Foundation. If the Library as you received it does not specify a version number of the GNU Lesser General Public License, you may choose any version of the GNU Lesser General Public License ever published by the Free Software Foundation.

If the Library as you received it specifies that a proxy can decide whether future versions of the GNU Lesser General Public License shall apply, that proxy's public statement of acceptance of any version is permanent authorization for you to choose that version for the Library.

*/

ClassAndPackageObjectCore = (function() {

   var maxIdDefinition  = 0;
   var testListDef      = {};
   var beacon           = {};
   var jsObject         = {};

   var constants        = { INIT    : 'INIT'
                          , DEFINE  : 'define'
                          , CLASS   : 'CLASS'
                          , FINAL   : 'final'
                          , OBJECT  : 'OBJECT'
                          , PACKAGE : 'PACKAGE'
                          , SUPER   : 'super'
                          , EXTENDS : 'extends'
                          };

   var convertDefinition = function(oldDef) {

      var declaration;
      var newDef;
      var object;
      var static;
      var name;
      var def;
      var invalid;
      var extend;
      var extendedProperty;
      var extendDefinition;

      newDef        = {}; 
      newDef.static = {};
      newDef.object = {};
      newDef.Class  = {};

      if (validDefine(oldDef)) {

         if (oldDef.Class.extends != undefined) {
            
            if (oldDef.Class.extends.Class.final) {
               throw new Errors.finalClassExtended();
               return;
            }

            newDef.Class.extends = oldDef.Class.extends;
         }
         else {
            newDef.Class.extends = undefined;
         }

         if (oldDef.Class.Package != undefined) {
            if (!PackageObject.isPackage(oldDef.Class.Package)) {
               throw new Errors.NotAValidPackage();
               return;
            }
            newDef.Class.Package = oldDef.Class.Package;
         }
         else {
            newDef.Class.Package = undefined;
         }

         if (oldDef.Class.final != undefined) {
            newDef.Class.final = oldDef.Class.final;
         }
         else {
            newDef.Class.final = false;
         }
      }
      else {
         newDef.Class.extends = undefined;
         newDef.Class.Package = undefined;
         newDef.Class.final   = false;
      }

      extend = newDef.Class.extends != undefined;
      
      if (extend)
         extendDefinition = newDef.Class.extends.Class.getDefinition(beacon)

      for(name in oldDef) {

         if (name != 'Class' ) {

            declaration = convertToStandard(name, oldDef);

            if (extend) {
               
               extendedProperty = undefined;

               if (extendDefinition.static[name] != undefined) {
                  extendedProperty = extendDefinition.static[name];
               }
               else if (extendDefinition.object[name] != undefined) {
                  extendedProperty = extendDefinition.object[name];
               }

               if (extendedProperty != undefined) {

                  if (extendedProperty.isFinal())
                     throw new Errors.finalPropertyExtended();

                  if (declaration.isStatic() != extendedProperty.isStatic()) {
                  }

                  if (declaration.isMethod() != extendedProperty.isMethod()) {
                  }

                  if (declaration.isAttribute() != extendedProperty.isAttribute()) {
                  }

                  if (declaration.isClass() != extendedProperty.isClass()) {
                  }

                  if (declaration.isPrivate() != extendedProperty.isPrivate()) {
                  }
                  
                  if (declaration.isProtected() != extendedProperty.isProtected()) {
                  }
                  
                  if (declaration.isPublic() != extendedProperty.isPublic()) {
                  }
                  
                  if (declaration.isConstant() != extendedProperty.isConstant()) {
                  }

               }

            }

            if (declaration.isStatic())
               newDef.static[name] = declaration;
            else
               newDef.object[name] = declaration;
         }
      }

      return newDef;

   };

   var convertToStandard = function(name, oldDef) {

      var defType;
      var value;
      var newDef;

      if (isDynamicValue(oldDef, name)) {
         throw new Errors.isDynamicValue(name);
         return;
      }

      defType = 'simple';
      oldDef  = oldDef[name];

      if (typeof(oldDef) == 'function') {
         if (isStandardProperty(oldDef)) {

            newDef  = oldDef.clone;

            if (oldDef.isMethod() && !oldDef.isValueSetted()) {
            }
            if (oldDef.isClass()) {
               newDef.Class(convertDefinition(oldDef.getValue));
            }

            defType = 'standard';
         }
         else if (hasProperty(oldDef, 'define')) {

            if (!isDynamicValue(oldDef, 'define')) {
               if (isStandardProperty(oldDef.define)) {
                  defType = 'define';
                  newDef  = oldDef.define.clone;

                  if (newDef.isTypeDefined()) {
                     if (newDef.isMethod() && !newDef.isValueSetted()) {
                        if (hasProperty(oldDef, 'method')) {
                        }
                        else {
                           newDef.set(oldDef.value);
                        }
                     }
                     else if (oldDef.isAttribute() && !oldDef.isValueSetted() && oldDef.hasOwnProperty('value')) {
                        newDef.set(oldDef.method);
                     }
                     else if (oldDef.isClass()) {
                        newDef.Class(convertDefinition(oldDef.getValue));
                     }
                  }
                  else {
                     if (oldDef.hasOwnProperty('value') && oldDef.method != undefined) {
                     }
                     else if (oldDef.hasOwnProperty('value')) {
                        newDef.set(oldDef.value);
                     }
                     else {
                        newDef.set(oldDef.method);
                     }
                  }
               }
            }
         }
      }

      if (defType == 'simple') {

         newDef = new Definition();

         if (typeof(oldDef) == 'function') {
            newDef.public.method.set(oldDef);
         }
         else {
            newDef.public.attribute.set(oldDef);
         }
      }

      return newDef;

   };

   var hasNonDymanicProperty = function(object, name, valueType) {

      if (!hasProperty(object, name))
         return false;

      if (isDynamicValue(object, name))
         return false;

      if (valueType != undefined)
         if (typeof(object[name]) != valueType)
            return false;

      return true;
   };

   var hasProperty = function(object, property) {
      return jsObject.getOwnPropertyNames(object).indexOf(property) != -1;
   };

   var isDynamicValue = function(object, property) {
      return jsObject.getOwnPropertyDescriptor(object, property).get != undefined;
   };

   var isStandardProperty = function(property) {

      var stdProp;

      if (typeof(property) != 'function')
         return false;

      if (!hasProperty(property, 'checkStandard'))
         return false;

      if (isDynamicValue(property, 'checkStandard'))
         return false;

      var id = property.checkStandard();

      if (typeof(id) != 'number')
         return false;

      stdProp = testListDef[id];
      delete(testListDef[id])
      if (stdProp != property) {
         return false;
      }

      return true;

   };

   var secureObject = function() {

      var properties = Object.getOwnPropertyNames(Object);

      for(var o in properties) {
         jsObject[properties[o]] = Object[properties[o]];
         Object.defineProperty(jsObject, properties[o], { writable : false });
      }

      Object.seal(jsObject);

   };

   var validDefine = function(object) {

      var i;
      var name;
      var classObject;

      if (!hasProperty(object, 'Class')) {
         return false;
      }

      if (isDynamicValue(object, 'Class')) {
         throw new Errors.defineObjectisDynamic;
      }

      if (object.Class == undefined) {
         return false;
      }

      if (typeof(object.Class) != 'object') {
         throw new Errors.defineIsNotAnObject;
      }

      var list = {};
      list.extends = 'class';
      list.final   = 'boolean';

      classObject = object.Class

      for(i in jsObject.keys(classObject)) {

         name = jsObject.keys(classObject)[i];
         if (classObject[name] == undefined)
            continue;

         if (list[name] == undefined)
            throw new Errors.invalidDefineProperty(name);

         if (isDynamicValue(classObject, name))
            throw new Errors.invalidDefineProperty(name);

         if (list[name] == 'class') {
            if (!ClassObject.isClass(classObject[name]))
               throw new Errors.invalidDefineProperty(name);
         }
         else {
            if (typeof(classObject[name]) != list[name])
               throw new Errors.invalidDefineProperty(name);
         }
      }

      return true;
   }

   var DefineObject = (function() {

      var newdefineObject = function (defineType, definition, sourceEnv) {

         var private, public;

         private = {};
         public  = {};

         private.public       = public;
         private.beacon       = beacon;
         private.seal         = seal;
         private.jsObject     = jsObject;
         private.sourceEnv    = sourceEnv;

         if (defineType == constants.CLASS) {

            if (definition.Class.final) {
               public.final         = true;
            }
            else {
               public.final         = false;
               private.definition   = definition;
               private.extend       = extend;

               public.extend = function() {
                  return extend.apply(private, arguments);
               }

               jsObject.defineProperty(public, 'extend', {writable:false});
            }

            if (definition.Package != undefined) {
               private.Package = definition.Package;
            }

            jsObject.defineProperty(public, 'final', {writable:false});

         }
         else {
            private.definition = definition.object;
         }

         private.getDefinition = getDefinition;
         public.getDefinition = function() {
            return getDefinition.apply(private, arguments);
         }
         jsObject.defineProperty(public, 'getDefinition', {writable:false});

         return public;
      };

      var getDefinition = function(beacon) {
         if (this.beacon != beacon) {
         }

         return this.definition;
      }

     var seal = function() {
        delete(this.public.private);
        delete(this.public.seal);
        this.jsObject.defineProperty(this.public, 'id'    , {writable:false});
        this.jsObject.defineProperty(this.public, 'class' , {writable:false});
        this.jsObject.seal(public);
     };

     var extend = function(beacon, extendType, listEnv, publicEnv, finalEnv) {

        if (this.beacon != beacon) {
           throw new Errors.unallowedAccess;
        }

        var me              = {};              
        me.environment      = {};              
        me.definition       = this.definition; 
        me.type             = 'Object';
        me.Class            = newdefineObject(extendType, this.definition);
        me.environment[constants.FINAL] = finalEnv;

        if (me.definition.Class.extends != undefined) {
           listEnv.push(me.environment);
           me[constants.SUPER] = me.definition.Class.extends.Class.extend(this.beacon, extendType, listEnv, publicEnv, finalEnv);
           listEnv.pop();
        }
        else {
           me[constants.SUPER] = {};
        }

        if (extendType == constants.OBJECT) {
           for(var name in me.definition.object) {
              ClassObject.declare ( me.environment              
                                  , name                       
                                  , me.definition.object[name] 
                                  , listEnv                     
                                  , me.super                    
                                  , publicEnv                   
                                  , finalEnv                    
                                  , constants.OBJECT);          
           }
        }
        else {

           for (name in this.definition.static) {

              ClassObject.declare ( me.environment             
                                  , name                       
                                  , me.definition.static[name] 
                                  , listEnv                    
                                  , me[constants.SUPER]        
                                  , publicEnv                  
                                  , finalEnv                   
                                  , constants.CLASS);          
           }
        }

        this.jsObject.seal(me.environment);

        return me[constants.SUPER];
     };

     return newdefineObject;

   })();

   var Definition       = (function() {

      var public      =  function(value) {
         return p.public.set(value);
      };

      var p           = {};

      var sealed      = false;
      p.alias         = {};   
      p.alias.defined = false;
      p.public        = public;

      p.constant      = false;
      p.final         = false;    
      p.tfo           =  -1;     
      p.s             =  -1;    
      p.t             =  -1;     
      p.visibility    =  -1;
      p.valueSet      =  false;
      maxIdDefinition += 1;
      p.id            = maxIdDefinition;
      p.testListDef   = testListDef;
      p.sourceEnv     = undefined;
      p.beacon        = beacon;
      p.linked        = true;
      p.class         = false;

      Object.defineProperty(public, 'attribute'  , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('attribute')  ; p.t          = 1    ; return this}});
      Object.defineProperty(public, 'Class'      , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('class')      ; p.class      = true ; return this}});
      Object.defineProperty(public, 'constant'   , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('constant')   ; p.constant   = true ; return this}});
      Object.defineProperty(public, 'dissociated', { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('dissociated'); p.linked     = false; return this}});
      Object.defineProperty(public, 'final'      , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('final')      ; p.final      = true ; return this}});
      Object.defineProperty(public, 'function'   , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('method')     ; p.t          = 2    ; return this}});
      Object.defineProperty(public, 'linked'     , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('linked')     ; p.linked     = true ; return this}});
      Object.defineProperty(public, 'method'     , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('method')     ; p.t          = 2    ; return this}});
      Object.defineProperty(public, 'private'    , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('private')    ; p.visibility = 0    ; return this}});
      Object.defineProperty(public, 'protected'  , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('protected')  ; p.visibility = 1    ; return this}});
      Object.defineProperty(public, 'public'     , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('public')     ; p.visibility = 2    ; return this}});
      Object.defineProperty(public, 'static'     , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('static')     ; p.s          = 1    ; return this}});
      Object.defineProperty(public, 'variable'   , { get      : function() { if (this.isSealed()) throw new ClassObject.Errors.definitionSealed('attribute')  ; p.t          = 1    ; return this}});

      Object.defineProperty(public, 'clone'    , { get      :
         function() {
            var d = ClassAndPackageObjectCore.Definition();

            if (this.isAlias())
               d.setAlias(p.sourceEnv, p.alias.sourceName);
            else if(p.sourceEnv != undefined)
               d.setSourceEnv(p.beacon, p.sourceEnv);

            if (this.isFinal())     {d.final};
            if (this.isTypeDefined()) {
               if (this.isMethod())    {d.method};
               if (this.isAttribute()) {d.attribute};
            }
            if (this.isPrivate())   {d.private  };
            if (this.isProtected()) {d.protected};
            if (this.isPublic())    {d.public   };
            if (this.isConstant())  {d.constant };
            if (this.isStatic())    {d.static   };
            if (this.isClass())     {d.Class    };
            d.set(this.getValue());
            return d;
         }});

      public.isAlias            = function()    { return p.alias.defined };
      public.isAttribute        = function()    { return p.t   == 1 || p.t == -1 };
      public.isClass            = function()    { return p.class  };
      public.isFinal            = function()    { return p.final  };
      public.isLinked           = function()    { return p.linked };
      public.isMethod           = function()    { return p.t   == 2 };
      public.isPrivate          = function()    { return p.visibility == 0 };
      public.isProtected        = function()    { return p.visibility == 1 };
      public.isPublic           = function()    { return p.visibility == 2 || p.visibility == -1  };
      public.isConstant         = function()    { return p.constant };
      public.isStatic           = function()    { return p.s   == 1 };
      public.isSealed           = function()    { return p.sealed == true };
      public.isTypeDefined      = function()    { return p.t   != -1 };
      public.isValueSetted      = function()    { return p.valueSet };
      public.getValue           = function()    { return p.value };

      public.setSourceEnv       =
         function(beacon, sourceEnv) {
            if (beacon != p.beacon)
               throw new ClassObject.errors.unauthorizedAccess();
            p.sourceEnv = sourceEnv;
         };


      public.set                =
         function(value) {
            if (this.isSealed())
               throw new ClassObject.errors.SealedDefinition('value');
            p.value    = value;
            p.valueSet = true;
            return this;
         };

      public.getSourceEnv       = function()    { return p.sourceEnv        };
      public.getAliasSourceName = function()    { return p.alias.sourceName };

      public.checkStandard      = function()    { p.testListDef[p.id] = p.me; return p.id };

      public.setAlias           = function(sourceEnv, sourceName) {
         if (this.isSealed())
            throw new ClassObject.errors.SealedDefinition('alias');

         p.sourceEnv        = sourceEnv;
         p.alias.sourceName = sourceName;
         p.alias.defined    = true;

         return this;
      }

      public.seal            = function() {
         p.sealed = true;
         Object.seal(p.alias);

         if (p.linked) {
            if (typeof(p.value) != 'object' && typeof(p.value) !='array') {
               p.linked = false;
            }
            else {
               for(var i in p.value) {
                  if (isDynamicValue(p.value, i)) {
                     p.linked = false;
                     break;
                  }
               }
            }
         }
      };

      public.forPackage         = function()    {
         p.f = false;
         p.s = 0;
         if (this.isProtected()) {
            p.visibility = 0;
         }
      };

      p.me = public;

      Object.seal(public);

      return p.public;
   });

   var Errors           = {
        isDynamicValue        : function(name) { this.name='isDynamicValue'       ; this.message='The attribute/method "'+name+'" as a dynamic value.'}
      , definitionSealed      : function(name) { this.name='definitionSealed'     ; this.message='The definition is sealed and cannot be modified.'   }
      , notAClass             : function(name) { this.name='notAClass'            ; this.message='A class is expected for extend'                     }
      , finalClassExtended    : function(name) { this.name='FinalClassExtended'   ; this.message='Try to extend final class'                          }
      , finalPropertyExtended : function(name) { this.name='finalPropertyExtended'; this.message='Try to extend final property'                       }
      , invalidDefineProperty : function(name) { this.name='invalidDefineProperty'; this.message='The "define" property "' + name + '" is invalid'    }
      , defineObjectisDynamic : function(name) { this.name='defineObjectisDynamic'; this.message='The "define" object is dynamic'                     }
      , defineIsNotAnObject   : function(name) { this.name='defineIsNotAnObject'  ; this.message='"define" is not an object'                          }
      , unallowedAccess       : function(name) { this.name='unallowedAccess'      ; this.message='Try to access un unallowed function'                }
   };

   var ClassObject      = (function(err) {
      var listClasses      = {};
      var maxIdClass       = 0;

      var Errors           = {
           isDynamicValue        : err.isDynamicValue
         , definitionSealed      : err.definitionSealed
         , notAClass             : err.notAClass
         , finalClassExtended    : err.finalClassExtended
         , finalPropertyExtended : err.finalPropertyExtended
         , invalidDefineProperty : err.invalidDefineProperty
         , defineObjectisDynamic : err.defineObjectisDynamic
         , defineIsNotAnObject   : err.defineIsNotAnObject
         , unallowedAccess       : err.unallowedAccess
      };

      var convertDefinitionPublic = function(oldDef) {

         var def = convertDefinition(oldDef);
         var newDef = {};

         for(var name in def.object) {
            newDef[name] = def.object[name];
            if (newDef[name].isMethod())
               newDef[name].constant;
         };

         for(var name in def.static) {
            newDef[name] = def.static[name];
            if (newDef[name].isMethod())
               newDef[name].constant;
         };

         newDef.Class = {};
         newDef.Class.extends = def.Class.extends;
         newDef.Class.Package = def.Class.Package;

         return newDef;

      }

      var createClass  = function(definition, id) {

         var environment                 = {};
         var Class                       = new DefineObject(constants.CLASS, definition, environment);
         
         var me                          = {};
         me.environment                  = environment;
         me.public                       = createNewClass(Class);
         me.definition                   = definition; 
         me.type                         = constants.CLASS;
         me.Class                        = Class;
         me.environment[constants.SUPER] = {};
         me.environment[constants.FINAL] = {};

         me.Class.extends                = definition.Class.extends;
         me.Class.final                  = definition.Class.final;
         me.Class.Class                  = me.public;
         me.Class.id                     = id;

         me.Class.new                    = function() {
            return createObject(definition);
         }

         if (me.Class.extends != undefined) {
            me.environment.super = me.Class.extends.Class.extend( beacon                          
                                                                , me.type                         
                                                                , [me.environment]                
                                                                , me.public                       
                                                                , me.environment[constants.FINAL] 
                                                                );
         }

         for(var name in me.definition.static) {
            declare ( me.environment                 
                    , name                           
                    , me.definition.static[name]     
                    , []                             
                    , {}                             
                    , me.public                      
                    , me.environment[constants.FINAL]
                    , constants.CLASS                
                    );
                    
            if (name != constants.INIT) {
               me.definition.object[name] = me.definition.static[name].clone.setAlias(me.environment, name);
            }
         }

         me.public.Class = me.Class;
         
         var property = { writable     : false
                        , configurable : false
                        , enumerable   : true }

         jsObject.defineProperty(me.Class, 'id'     , property);
         jsObject.defineProperty(me.Class, 'Class'  , property);
         jsObject.defineProperty(me.Class, 'final'  , property);
         jsObject.defineProperty(me.Class, 'extends', property);
         jsObject.defineProperty(me.Class, 'extend' , property);
         jsObject.defineProperty(me.Class, 'new'    , property);
         jsObject.defineProperty(me, 'Class'        , property);
         
         jsObject.defineProperty(me.public, 'Class', { writable     : false
                                                     , configurable : false
                                                     , enumerable   : false });

         jsObject.seal(me.environment[constants.SUPER]);
         jsObject.seal(me.environment[constants.FINAL]);
         jsObject.seal(me.environment);
         jsObject.seal(me.public);

         return me.public;
      }

      var createNewClass = function(Class) {

         var fct = function() {
            return Class.new();
         }

         var def =  jsObject.getOwnPropertyNames(fct);

         for(var i in def) {
            delete(fct[def[i]]);
         }

         return fct;

      }

      var createObject = function(definition) {

         var name;

         var me                          = {};
         me.environment                  = {};
         me.public                       = {};
         me.definition                   = definition; 
         me.type                         = constants.OBJECT;
         me.Class                        = new DefineObject(constants.OBJECT, me.definition);
         me.environment[constants.SUPER] = {};
         me.environment[constants.FINAL] = {};

         if (me.definition.Class.extends != undefined) {
            me.environment.super = me.definition.Class.extends.Class.extend ( beacon                           
                                                                            , me.type                          
                                                                            , [me.environment]                 
                                                                            , me.public                        
                                                                            , me.environment[constants.FINAL]  
                                                                            );
         }

         for(name in me.definition.object) {
            declare ( me.environment                  
                    , name                            
                    , me.definition.object[name]      
                    , []                              
                    , {}                              
                    , me.public                       
                    , me.environment[constants.FINAL] 
                    , constants.OBJECT                
                    );
         }

         jsObject.seal(me.environment);
         jsObject.seal(me.public);
         jsObject.seal(me.environment[constants.SUPER]);
         jsObject.seal(me.environment[constants.FINAL]);

         return me.public;
      }

      var declare = function(sourceEnv, name, definition, listEnv, superEnv, publicEnv, finalEnv, typeEnv) {

         var obj;
         var visibleArray;
         var method;
         var meToUse;
         var property = {};
         var orgSourceEnv;
         var asAlias = false;

         if (!definition.isAlias() && typeEnv == constants.CLASS && definition.getSourceEnv() == undefined) {
            definition.setSourceEnv(beacon, sourceEnv);
         }
         else if ((typeEnv == constants.CLASS && definition.getSourceEnv() != undefined) || (definition.isAlias())) {
            orgSourceEnv = sourceEnv; 
            sourceEnv    = definition.getSourceEnv();
            asAlias      = true;
         }

         if (definition.isMethod()) {
            method = definition.getValue();

            if (name==constants.INIT) {
               obj = function() {
                  var meObject = ClassObject.createObject(definition, sourceEnv);
                  method.apply(meObject, arguments);
               }
            }
            else {
               obj = function() {
                  return method.apply(sourceEnv, arguments);
               }
            }

            property.writable   = false;
            property.value      = obj;
            property.enumerable = true;

         }
         else {

            property.enumerable = true;

            property.get        = function() { return sourceEnv[name] };
            if (!definition.isConstant()) {
              property.set = function(v) { sourceEnv[name] = v };
            }

            property.value = definition.getValue();
            if (definition.isConstant()) {
               property.writable = false;
            }
            else {
               property.writable = true;
            }

         }

         property.configurable = false;

         if (!asAlias) {

          if (!definition.isLinked())
              property.value = dissociate(property.value);

            jsObject.defineProperty(sourceEnv, name, { writable   : property.writable
                                                     , value      : property.value
                                                     , enumerable : property.enumerable });
         }

         if (definition.isAttribute()) {
            delete(property.value);
            delete(property.writable);
         }

         if (asAlias) {
            jsObject.defineProperty(orgSourceEnv, name, property);
         }

         if (!definition.isPrivate()) {

            property.configurable = true;

            jsObject.defineProperty(finalEnv, name, property);

            jsObject.defineProperty(superEnv, name, property);

            for(var e in listEnv) {
               jsObject.defineProperty(listEnv[e], name, property);
            }

            if (definition.isPublic()) {
               jsObject.defineProperty(publicEnv, name, property);
            }
         }
      };

      var dissociate  = function(value) {

        var newVal;

         if (typeof(value) == 'object') {
            newVal = {};
        }

        if (typeof(value)=='object') {
           newVal = [];
        }

        for(var i in value) {
            newVal[i] = value;
        }

        return value;

      };

      var isClass = function(cl) {

         var k;
         var ret;
         var v;

         if (typeof(cl) != 'function')
            return false;

         if (!hasNonDymanicProperty(cl, 'Class', 'object'))
            return false;

         if (!hasNonDymanicProperty(cl.Class, 'id', 'number'))
            return false;

         if (cl != listClasses[cl.Class.id])
            return false;

         return true;

      };

      var newClass = function(definition) {

         var cl;
         
         maxIdClass += 1
         
         definition = convertDefinition(definition)
         
         cl         = createClass(definition, maxIdClass);

         listClasses[maxIdClass] = cl;

         jsObject.seal(cl.Class);

         return cl;
      };

      var public = {
           convertDefinition : convertDefinitionPublic
         , Definition        : Definition
         , Errors            : Errors
         , isClass           : isClass
         , new               : newClass
         , Object            : jsObject
      };

      var protected = {
           isClass   : isClass
         , public    : public
         , Errors    : Errors
         , declare   : declare
      };

      return protected;

   })(Errors);

   var PackageObject    = (function() {

	   var listPackages = [];
	   var maxIdPackage = 0;

      var Errors = {
      };

      var newPackage = function(definition) {

         var pa;
         definition = convertDefinition(definition)
         checkDefinition(pa);

         pa = createPackage(definition);

         return pa;

      };

      var checkDefinition = function(definition) {

         var def, name;

         for(name in definition) {

            def = definition[name];

            if (def.isStatic()) {
               throw new Errors.StaticDefinitionNotSupported();
            };

            if (def.isFinal()) {
               throw new Errors.FinalDefinitionNotSupported();
            };

            if (def.isProtected()) {
               throw new Errors.ProtectedDefinitionNotSupported();
            }

         }

         return true;
      };

      var convertDefinitionPublic = function(oldDef) {

         var def = convertDefinition(oldDef);
         var newDef = {};

         for(var name in def.object) {
            newDef[name] = def.object[name];
            if (newDef[name].isMethod())
               newDef[name].constant;
         };

         newDef.Class = {};

         return newDef;

      };

      var createNewPackage = function() {

         var pkg = {};

         return pkg;

      }

      var createPackage = function(definition) {
         var me               = {}; 
         var name;

         me.environnement = {};
         me.public        = createNewPackage();

         for(name in definition.object) {
            declare ( me.environnement          
                    , me.public                 
                    , name                      
                    , definition.object[name]); 
         }

         return me.public;

      };

      var declare = function(sourceEnv, publicEnv, name, definition) {

         var value;
         var property;
         var method;

         value = definition.getValue();

         property = {};

         if (definition.isClass()) {
            try {
               var definition = ClassObject.public.convertDefinition(value);
            }
            catch(e) {
               throw new error();
            }

            if (value.define.package != undefined) {
               
            }

            value.define.package = publicEnv; 

            value = ClassObject.public.new(pubic);

            property.writable   = false;
            property.value      = value;

         }
         else if (definition.isMethod()) {

            method = definition.getValue();

            value =
               function() {
                  return method.apply(sourceEnv, arguments);
               };

            property.writable   = false;
            property.value      = value;

         }
         else {
            property.get        = function() { return sourceEnv[name] };
            
            if (!definition.isConstant()) {
              property.set = function(v) { sourceEnv[name] = v };
            }

            property.value = definition.getValue();
            if (definition.isConstant()) {
               property.writable = false;
            }
            else {
               property.writable = true;
            }
         }

         property.configurable = false;
         property.enumerable = true;

         jsObject.defineProperty(sourceEnv, name, { writable   : property.writable
                                                  , value      : property.value
                                                  , enumerable : property.enumerable });


         if (definition.isAttribute()) {
            delete(property.value);
            delete(property.writable);
         }

         if (definition.isPublic()) {

            jsObject.defineProperty(publicEnv, name, property);

         };

      };

      var isPackage = function(pa) {

         var k;
         var ret;
         var v;

         if (typeof(pa) != 'object')
            return false;

         if (!hasNonDymanicProperty(pa.prototype, 'define', 'object'))
            return false;

         if (!hasNonDymanicProperty(pa.prototype.define, 'id', 'number'))
            return false;

         if (pa != listPackages[pa.prototype.define.id])
            return false;

         return true;

      };

      var public = {
           new               : newPackage
         , Errors            : Errors
         , convertDefinition : convertDefinitionPublic
         , Object            : jsObject
         , Definition        : Definition
         , isPackage         : isPackage
      };

      var protected = {
           isPackage : isPackage
         , public    : public
         , Errors    : Errors
      };

      return protected;

   })();

   secureObject();

   for(var i in Errors) {
      Errors[i].prototype = Error.prototype;
   }

   var public = {};

   public.Definition        = Definition;
   public.ClassObject       = ClassObject.public;
   public.PackageObject     = PackageObject.public;

   return public;

})();

Object.defineProperty(this, 'ClassObject', { get : function() { return ClassAndPackageObjectCore.ClassObject;  }});

Object.defineProperty(ClassAndPackageObjectCore, 'public'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.public   ; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'private'  , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.private  ; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'protected', { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.protected; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'static'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.static   ; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'final'    , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.final    ; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'constant' , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.constant ; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'alias'    , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.alias    ; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'method'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.method   ; return d;}});
Object.defineProperty(ClassAndPackageObjectCore, 'attribute', { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.attribute; return d;}});

Object.defineProperty(ClassObject              , 'public'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.public   ; return d;}});
Object.defineProperty(ClassObject              , 'private'  , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.private  ; return d;}});
Object.defineProperty(ClassObject              , 'protected', { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.protected; return d;}});
Object.defineProperty(ClassObject              , 'static'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.static   ; return d;}});
Object.defineProperty(ClassObject              , 'final'    , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.final    ; return d;}});
Object.defineProperty(ClassObject              , 'constant' , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.constant ; return d;}});
Object.defineProperty(ClassObject              , 'alias'    , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.alias    ; return d;}});
Object.defineProperty(ClassObject              , 'method'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.method   ; return d;}});
Object.defineProperty(ClassObject              , 'attribute', { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.attribute; return d;}});

Object.defineProperty(this                     , 'public'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.public   ; return d;}});
Object.defineProperty(this                     , 'private'  , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.private  ; return d;}});
Object.defineProperty(this                     , 'protected', { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.protected; return d;}});
Object.defineProperty(this                     , 'static'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.static   ; return d;}});
Object.defineProperty(this                     , 'final'    , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.final    ; return d;}});
Object.defineProperty(this                     , 'constant' , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.constant ; return d;}});
Object.defineProperty(this                     , 'alias'    , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.alias    ; return d;}});
Object.defineProperty(this                     , 'method'   , { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.method   ; return d;}});
Object.defineProperty(this                     , 'attribute', { get : function() { var d = new ClassAndPackageObjectCore.Definition(); d = d.attribute; return d;}});

Object.defineProperty(this, 'Class'      , { get : function() { return ClassAndPackageObjectCore.ClassObject.new  }});
Object.defineProperty(this, 'Package'    , { get : function() { return ClassAndPackageObjectCore.PackageObject.new  }});

Object.seal(ClassObject);