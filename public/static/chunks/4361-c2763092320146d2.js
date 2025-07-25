"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4361], {
        44361: function(r, e, t) {
            t.d(e, {
                m: function() {
                    return u
                }
            });
            var o = /^\[(.+)\]$/;

            function getPart(r, e) {
                var t = r;
                return e.split("-").forEach(function(r) {
                    t.nextPart.has(r) || t.nextPart.set(r, {
                        nextPart: new Map,
                        validators: []
                    }), t = t.nextPart.get(r)
                }), t
            }
            var i = /\s+/;

            function twJoin() {
                for (var r, e, t = 0, o = ""; t < arguments.length;)(r = arguments[t++]) && (e = function toValue(r) {
                    if ("string" == typeof r) return r;
                    for (var e, t = "", o = 0; o < r.length; o++) r[o] && (e = toValue(r[o])) && (t && (t += " "), t += e);
                    return t
                }(r)) && (o && (o += " "), o += e);
                return o
            }

            function fromTheme(r) {
                var themeGetter = function(e) {
                    return e[r] || []
                };
                return themeGetter.isThemeGetter = !0, themeGetter
            }
            var n = /^\[(?:([a-z-]+):)?(.+)\]$/i,
                a = /^\d+\/\d+$/,
                s = new Set(["px", "full", "screen"]),
                l = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
                c = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
                d = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;

            function isLength(r) {
                return isNumber(r) || s.has(r) || a.test(r) || isArbitraryLength(r)
            }

            function isArbitraryLength(r) {
                return getIsArbitraryValue(r, "length", isLengthOnly)
            }

            function isArbitrarySize(r) {
                return getIsArbitraryValue(r, "size", isNever)
            }

            function isArbitraryPosition(r) {
                return getIsArbitraryValue(r, "position", isNever)
            }

            function isArbitraryUrl(r) {
                return getIsArbitraryValue(r, "url", isUrl)
            }

            function isArbitraryNumber(r) {
                return getIsArbitraryValue(r, "number", isNumber)
            }

            function isNumber(r) {
                return !Number.isNaN(Number(r))
            }

            function isPercent(r) {
                return r.endsWith("%") && isNumber(r.slice(0, -1))
            }

            function isInteger(r) {
                return isIntegerOnly(r) || getIsArbitraryValue(r, "number", isIntegerOnly)
            }

            function isArbitraryValue(r) {
                return n.test(r)
            }

            function isAny() {
                return !0
            }

            function isTshirtSize(r) {
                return l.test(r)
            }

            function isArbitraryShadow(r) {
                return getIsArbitraryValue(r, "", isShadow)
            }

            function getIsArbitraryValue(r, e, t) {
                var o = n.exec(r);
                return !!o && (o[1] ? o[1] === e : t(o[2]))
            }

            function isLengthOnly(r) {
                return c.test(r)
            }

            function isNever() {
                return !1
            }

            function isUrl(r) {
                return r.startsWith("url(")
            }

            function isIntegerOnly(r) {
                return Number.isInteger(Number(r))
            }

            function isShadow(r) {
                return d.test(r)
            }
            var u = function() {
                for (var r, e, t, n = arguments.length, a = Array(n), s = 0; s < n; s++) a[s] = arguments[s];
                var functionToCall = function(i) {
                    var n = a[0];
                    return e = (r = function(r) {
                        var e, t, i, n, a, s, l, c, d, u, b;
                        return {
                            cache: function(r) {
                                if (r < 1) return {
                                    get: function() {},
                                    set: function() {}
                                };
                                var e = 0,
                                    t = new Map,
                                    o = new Map;

                                function update(i, n) {
                                    t.set(i, n), ++e > r && (e = 0, o = t, t = new Map)
                                }
                                return {
                                    get: function(r) {
                                        var e = t.get(r);
                                        return void 0 !== e ? e : void 0 !== (e = o.get(r)) ? (update(r, e), e) : void 0
                                    },
                                    set: function(r, e) {
                                        t.has(r) ? t.set(r, e) : update(r, e)
                                    }
                                }
                            }(r.cacheSize),
                            splitModifiers: (t = 1 === (e = r.separator || ":").length, i = e[0], n = e.length, function(r) {
                                for (var o, a = [], s = 0, l = 0, c = 0; c < r.length; c++) {
                                    var d = r[c];
                                    if (0 === s) {
                                        if (d === i && (t || r.slice(c, c + n) === e)) {
                                            a.push(r.slice(l, c)), l = c + n;
                                            continue
                                        }
                                        if ("/" === d) {
                                            o = c;
                                            continue
                                        }
                                    }
                                    "[" === d ? s++ : "]" === d && s--
                                }
                                var u = 0 === a.length ? r : r.substring(l),
                                    b = u.startsWith("!"),
                                    p = b ? u.substring(1) : u;
                                return {
                                    modifiers: a,
                                    hasImportantModifier: b,
                                    baseClassName: p,
                                    maybePostfixModifierPosition: o && o > l ? o - l : void 0
                                }
                            }),
                            ...(c = r.theme, d = r.prefix, u = {
                                nextPart: new Map,
                                validators: []
                            }, (b = Object.entries(r.classGroups), d ? b.map(function(r) {
                                return [r[0], r[1].map(function(r) {
                                    return "string" == typeof r ? d + r : "object" == typeof r ? Object.fromEntries(Object.entries(r).map(function(r) {
                                        return [d + r[0], r[1]]
                                    })) : r
                                })]
                            }) : b).forEach(function(r) {
                                var e = r[0];
                                (function processClassesRecursively(r, e, t, o) {
                                    r.forEach(function(r) {
                                        if ("string" == typeof r) {
                                            ("" === r ? e : getPart(e, r)).classGroupId = t;
                                            return
                                        }
                                        if ("function" == typeof r) {
                                            if (r.isThemeGetter) {
                                                processClassesRecursively(r(o), e, t, o);
                                                return
                                            }
                                            e.validators.push({
                                                validator: r,
                                                classGroupId: t
                                            });
                                            return
                                        }
                                        Object.entries(r).forEach(function(r) {
                                            var i = r[0];
                                            processClassesRecursively(r[1], getPart(e, i), t, o)
                                        })
                                    })
                                })(r[1], u, e, c)
                            }), a = r.conflictingClassGroups, l = void 0 === (s = r.conflictingClassGroupModifiers) ? {} : s, {
                                getClassGroupId: function(r) {
                                    var e = r.split("-");
                                    return "" === e[0] && 1 !== e.length && e.shift(),
                                        function getGroupRecursive(r, e) {
                                            if (0 === r.length) return e.classGroupId;
                                            var t = r[0],
                                                o = e.nextPart.get(t),
                                                i = o ? getGroupRecursive(r.slice(1), o) : void 0;
                                            if (i) return i;
                                            if (0 !== e.validators.length) {
                                                var n = r.join("-");
                                                return e.validators.find(function(r) {
                                                    return (0, r.validator)(n)
                                                })?.classGroupId
                                            }
                                        }(e, u) || function(r) {
                                            if (o.test(r)) {
                                                var e = o.exec(r)[1],
                                                    t = e?.substring(0, e.indexOf(":"));
                                                if (t) return "arbitrary.." + t
                                            }
                                        }(r)
                                },
                                getConflictingClassGroupIds: function(r, e) {
                                    var t = a[r] || [];
                                    return e && l[r] ? [].concat(t, l[r]) : t
                                }
                            })
                        }
                    }(a.slice(1).reduce(function(r, e) {
                        return e(r)
                    }, n()))).cache.get, t = r.cache.set, functionToCall = tailwindMerge, tailwindMerge(i)
                };

                function tailwindMerge(o) {
                    var n, a, s, l, c, d = e(o);
                    if (d) return d;
                    var u = (a = (n = r).splitModifiers, s = n.getClassGroupId, l = n.getConflictingClassGroupIds, c = new Set, o.trim().split(i).map(function(r) {
                        var e = a(r),
                            t = e.modifiers,
                            o = e.hasImportantModifier,
                            i = e.baseClassName,
                            n = e.maybePostfixModifierPosition,
                            l = s(n ? i.substring(0, n) : i),
                            c = !!n;
                        if (!l) {
                            if (!n || !(l = s(i))) return {
                                isTailwindClass: !1,
                                originalClassName: r
                            };
                            c = !1
                        }
                        var d = (function(r) {
                            if (r.length <= 1) return r;
                            var e = [],
                                t = [];
                            return r.forEach(function(r) {
                                "[" === r[0] ? (e.push.apply(e, t.sort().concat([r])), t = []) : t.push(r)
                            }), e.push.apply(e, t.sort()), e
                        })(t).join(":");
                        return {
                            isTailwindClass: !0,
                            modifierId: o ? d + "!" : d,
                            classGroupId: l,
                            originalClassName: r,
                            hasPostfixModifier: c
                        }
                    }).reverse().filter(function(r) {
                        if (!r.isTailwindClass) return !0;
                        var e = r.modifierId,
                            t = r.classGroupId,
                            o = r.hasPostfixModifier,
                            i = e + t;
                        return !c.has(i) && (c.add(i), l(t, o).forEach(function(r) {
                            return c.add(e + r)
                        }), !0)
                    }).reverse().map(function(r) {
                        return r.originalClassName
                    }).join(" "));
                    return t(o, u), u
                }
                return function() {
                    return functionToCall(twJoin.apply(null, arguments))
                }
            }(function() {
                var r = fromTheme("colors"),
                    e = fromTheme("spacing"),
                    t = fromTheme("blur"),
                    o = fromTheme("brightness"),
                    i = fromTheme("borderColor"),
                    n = fromTheme("borderRadius"),
                    a = fromTheme("borderSpacing"),
                    s = fromTheme("borderWidth"),
                    l = fromTheme("contrast"),
                    c = fromTheme("grayscale"),
                    d = fromTheme("hueRotate"),
                    u = fromTheme("invert"),
                    b = fromTheme("gap"),
                    p = fromTheme("gradientColorStops"),
                    g = fromTheme("gradientColorStopPositions"),
                    f = fromTheme("inset"),
                    m = fromTheme("margin"),
                    y = fromTheme("opacity"),
                    h = fromTheme("padding"),
                    v = fromTheme("saturate"),
                    A = fromTheme("scale"),
                    x = fromTheme("sepia"),
                    w = fromTheme("skew"),
                    k = fromTheme("space"),
                    S = fromTheme("translate"),
                    getOverscroll = function() {
                        return ["auto", "contain", "none"]
                    },
                    getOverflow = function() {
                        return ["auto", "hidden", "clip", "visible", "scroll"]
                    },
                    getSpacingWithAutoAndArbitrary = function() {
                        return ["auto", isArbitraryValue, e]
                    },
                    getSpacingWithArbitrary = function() {
                        return [isArbitraryValue, e]
                    },
                    getLengthWithEmpty = function() {
                        return ["", isLength]
                    },
                    getNumberWithAutoAndArbitrary = function() {
                        return ["auto", isNumber, isArbitraryValue]
                    },
                    getPositions = function() {
                        return ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"]
                    },
                    getLineStyles = function() {
                        return ["solid", "dashed", "dotted", "double", "none"]
                    },
                    getBlendModes = function() {
                        return ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"]
                    },
                    getAlign = function() {
                        return ["start", "end", "center", "between", "around", "evenly", "stretch"]
                    },
                    getZeroAndEmpty = function() {
                        return ["", "0", isArbitraryValue]
                    },
                    getBreaks = function() {
                        return ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"]
                    },
                    getNumber = function() {
                        return [isNumber, isArbitraryNumber]
                    },
                    getNumberAndArbitrary = function() {
                        return [isNumber, isArbitraryValue]
                    };
                return {
                    cacheSize: 500,
                    theme: {
                        colors: [isAny],
                        spacing: [isLength],
                        blur: ["none", "", isTshirtSize, isArbitraryValue],
                        brightness: getNumber(),
                        borderColor: [r],
                        borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
                        borderSpacing: getSpacingWithArbitrary(),
                        borderWidth: getLengthWithEmpty(),
                        contrast: getNumber(),
                        grayscale: getZeroAndEmpty(),
                        hueRotate: getNumberAndArbitrary(),
                        invert: getZeroAndEmpty(),
                        gap: getSpacingWithArbitrary(),
                        gradientColorStops: [r],
                        gradientColorStopPositions: [isPercent, isArbitraryLength],
                        inset: getSpacingWithAutoAndArbitrary(),
                        margin: getSpacingWithAutoAndArbitrary(),
                        opacity: getNumber(),
                        padding: getSpacingWithArbitrary(),
                        saturate: getNumber(),
                        scale: getNumber(),
                        sepia: getZeroAndEmpty(),
                        skew: getNumberAndArbitrary(),
                        space: getSpacingWithArbitrary(),
                        translate: getSpacingWithArbitrary()
                    },
                    classGroups: {
                        aspect: [{
                            aspect: ["auto", "square", "video", isArbitraryValue]
                        }],
                        container: ["container"],
                        columns: [{
                            columns: [isTshirtSize]
                        }],
                        "break-after": [{
                            "break-after": getBreaks()
                        }],
                        "break-before": [{
                            "break-before": getBreaks()
                        }],
                        "break-inside": [{
                            "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                        }],
                        "box-decoration": [{
                            "box-decoration": ["slice", "clone"]
                        }],
                        box: [{
                            box: ["border", "content"]
                        }],
                        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                        float: [{
                            float: ["right", "left", "none"]
                        }],
                        clear: [{
                            clear: ["left", "right", "both", "none"]
                        }],
                        isolation: ["isolate", "isolation-auto"],
                        "object-fit": [{
                            object: ["contain", "cover", "fill", "none", "scale-down"]
                        }],
                        "object-position": [{
                            object: [].concat(getPositions(), [isArbitraryValue])
                        }],
                        overflow: [{
                            overflow: getOverflow()
                        }],
                        "overflow-x": [{
                            "overflow-x": getOverflow()
                        }],
                        "overflow-y": [{
                            "overflow-y": getOverflow()
                        }],
                        overscroll: [{
                            overscroll: getOverscroll()
                        }],
                        "overscroll-x": [{
                            "overscroll-x": getOverscroll()
                        }],
                        "overscroll-y": [{
                            "overscroll-y": getOverscroll()
                        }],
                        position: ["static", "fixed", "absolute", "relative", "sticky"],
                        inset: [{
                            inset: [f]
                        }],
                        "inset-x": [{
                            "inset-x": [f]
                        }],
                        "inset-y": [{
                            "inset-y": [f]
                        }],
                        start: [{
                            start: [f]
                        }],
                        end: [{
                            end: [f]
                        }],
                        top: [{
                            top: [f]
                        }],
                        right: [{
                            right: [f]
                        }],
                        bottom: [{
                            bottom: [f]
                        }],
                        left: [{
                            left: [f]
                        }],
                        visibility: ["visible", "invisible", "collapse"],
                        z: [{
                            z: ["auto", isInteger]
                        }],
                        basis: [{
                            basis: getSpacingWithAutoAndArbitrary()
                        }],
                        "flex-direction": [{
                            flex: ["row", "row-reverse", "col", "col-reverse"]
                        }],
                        "flex-wrap": [{
                            flex: ["wrap", "wrap-reverse", "nowrap"]
                        }],
                        flex: [{
                            flex: ["1", "auto", "initial", "none", isArbitraryValue]
                        }],
                        grow: [{
                            grow: getZeroAndEmpty()
                        }],
                        shrink: [{
                            shrink: getZeroAndEmpty()
                        }],
                        order: [{
                            order: ["first", "last", "none", isInteger]
                        }],
                        "grid-cols": [{
                            "grid-cols": [isAny]
                        }],
                        "col-start-end": [{
                            col: ["auto", {
                                span: ["full", isInteger]
                            }, isArbitraryValue]
                        }],
                        "col-start": [{
                            "col-start": getNumberWithAutoAndArbitrary()
                        }],
                        "col-end": [{
                            "col-end": getNumberWithAutoAndArbitrary()
                        }],
                        "grid-rows": [{
                            "grid-rows": [isAny]
                        }],
                        "row-start-end": [{
                            row: ["auto", {
                                span: [isInteger]
                            }, isArbitraryValue]
                        }],
                        "row-start": [{
                            "row-start": getNumberWithAutoAndArbitrary()
                        }],
                        "row-end": [{
                            "row-end": getNumberWithAutoAndArbitrary()
                        }],
                        "grid-flow": [{
                            "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                        }],
                        "auto-cols": [{
                            "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
                        }],
                        "auto-rows": [{
                            "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
                        }],
                        gap: [{
                            gap: [b]
                        }],
                        "gap-x": [{
                            "gap-x": [b]
                        }],
                        "gap-y": [{
                            "gap-y": [b]
                        }],
                        "justify-content": [{
                            justify: ["normal"].concat(getAlign())
                        }],
                        "justify-items": [{
                            "justify-items": ["start", "end", "center", "stretch"]
                        }],
                        "justify-self": [{
                            "justify-self": ["auto", "start", "end", "center", "stretch"]
                        }],
                        "align-content": [{
                            content: ["normal"].concat(getAlign(), ["baseline"])
                        }],
                        "align-items": [{
                            items: ["start", "end", "center", "baseline", "stretch"]
                        }],
                        "align-self": [{
                            self: ["auto", "start", "end", "center", "stretch", "baseline"]
                        }],
                        "place-content": [{
                            "place-content": [].concat(getAlign(), ["baseline"])
                        }],
                        "place-items": [{
                            "place-items": ["start", "end", "center", "baseline", "stretch"]
                        }],
                        "place-self": [{
                            "place-self": ["auto", "start", "end", "center", "stretch"]
                        }],
                        p: [{
                            p: [h]
                        }],
                        px: [{
                            px: [h]
                        }],
                        py: [{
                            py: [h]
                        }],
                        ps: [{
                            ps: [h]
                        }],
                        pe: [{
                            pe: [h]
                        }],
                        pt: [{
                            pt: [h]
                        }],
                        pr: [{
                            pr: [h]
                        }],
                        pb: [{
                            pb: [h]
                        }],
                        pl: [{
                            pl: [h]
                        }],
                        m: [{
                            m: [m]
                        }],
                        mx: [{
                            mx: [m]
                        }],
                        my: [{
                            my: [m]
                        }],
                        ms: [{
                            ms: [m]
                        }],
                        me: [{
                            me: [m]
                        }],
                        mt: [{
                            mt: [m]
                        }],
                        mr: [{
                            mr: [m]
                        }],
                        mb: [{
                            mb: [m]
                        }],
                        ml: [{
                            ml: [m]
                        }],
                        "space-x": [{
                            "space-x": [k]
                        }],
                        "space-x-reverse": ["space-x-reverse"],
                        "space-y": [{
                            "space-y": [k]
                        }],
                        "space-y-reverse": ["space-y-reverse"],
                        w: [{
                            w: ["auto", "min", "max", "fit", isArbitraryValue, e]
                        }],
                        "min-w": [{
                            "min-w": ["min", "max", "fit", isArbitraryValue, isLength]
                        }],
                        "max-w": [{
                            "max-w": ["0", "none", "full", "min", "max", "fit", "prose", {
                                screen: [isTshirtSize]
                            }, isTshirtSize, isArbitraryValue]
                        }],
                        h: [{
                            h: [isArbitraryValue, e, "auto", "min", "max", "fit"]
                        }],
                        "min-h": [{
                            "min-h": ["min", "max", "fit", isArbitraryValue, isLength]
                        }],
                        "max-h": [{
                            "max-h": [isArbitraryValue, e, "min", "max", "fit"]
                        }],
                        "font-size": [{
                            text: ["base", isTshirtSize, isArbitraryLength]
                        }],
                        "font-smoothing": ["antialiased", "subpixel-antialiased"],
                        "font-style": ["italic", "not-italic"],
                        "font-weight": [{
                            font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
                        }],
                        "font-family": [{
                            font: [isAny]
                        }],
                        "fvn-normal": ["normal-nums"],
                        "fvn-ordinal": ["ordinal"],
                        "fvn-slashed-zero": ["slashed-zero"],
                        "fvn-figure": ["lining-nums", "oldstyle-nums"],
                        "fvn-spacing": ["proportional-nums", "tabular-nums"],
                        "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
                        tracking: [{
                            tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
                        }],
                        "line-clamp": [{
                            "line-clamp": ["none", isNumber, isArbitraryNumber]
                        }],
                        leading: [{
                            leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isArbitraryValue, isLength]
                        }],
                        "list-image": [{
                            "list-image": ["none", isArbitraryValue]
                        }],
                        "list-style-type": [{
                            list: ["none", "disc", "decimal", isArbitraryValue]
                        }],
                        "list-style-position": [{
                            list: ["inside", "outside"]
                        }],
                        "placeholder-color": [{
                            placeholder: [r]
                        }],
                        "placeholder-opacity": [{
                            "placeholder-opacity": [y]
                        }],
                        "text-alignment": [{
                            text: ["left", "center", "right", "justify", "start", "end"]
                        }],
                        "text-color": [{
                            text: [r]
                        }],
                        "text-opacity": [{
                            "text-opacity": [y]
                        }],
                        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                        "text-decoration-style": [{
                            decoration: [].concat(getLineStyles(), ["wavy"])
                        }],
                        "text-decoration-thickness": [{
                            decoration: ["auto", "from-font", isLength]
                        }],
                        "underline-offset": [{
                            "underline-offset": ["auto", isArbitraryValue, isLength]
                        }],
                        "text-decoration-color": [{
                            decoration: [r]
                        }],
                        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                        indent: [{
                            indent: getSpacingWithArbitrary()
                        }],
                        "vertical-align": [{
                            align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
                        }],
                        whitespace: [{
                            whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                        }],
                        break: [{
                            break: ["normal", "words", "all", "keep"]
                        }],
                        hyphens: [{
                            hyphens: ["none", "manual", "auto"]
                        }],
                        content: [{
                            content: ["none", isArbitraryValue]
                        }],
                        "bg-attachment": [{
                            bg: ["fixed", "local", "scroll"]
                        }],
                        "bg-clip": [{
                            "bg-clip": ["border", "padding", "content", "text"]
                        }],
                        "bg-opacity": [{
                            "bg-opacity": [y]
                        }],
                        "bg-origin": [{
                            "bg-origin": ["border", "padding", "content"]
                        }],
                        "bg-position": [{
                            bg: [].concat(getPositions(), [isArbitraryPosition])
                        }],
                        "bg-repeat": [{
                            bg: ["no-repeat", {
                                repeat: ["", "x", "y", "round", "space"]
                            }]
                        }],
                        "bg-size": [{
                            bg: ["auto", "cover", "contain", isArbitrarySize]
                        }],
                        "bg-image": [{
                            bg: ["none", {
                                "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                            }, isArbitraryUrl]
                        }],
                        "bg-color": [{
                            bg: [r]
                        }],
                        "gradient-from-pos": [{
                            from: [g]
                        }],
                        "gradient-via-pos": [{
                            via: [g]
                        }],
                        "gradient-to-pos": [{
                            to: [g]
                        }],
                        "gradient-from": [{
                            from: [p]
                        }],
                        "gradient-via": [{
                            via: [p]
                        }],
                        "gradient-to": [{
                            to: [p]
                        }],
                        rounded: [{
                            rounded: [n]
                        }],
                        "rounded-s": [{
                            "rounded-s": [n]
                        }],
                        "rounded-e": [{
                            "rounded-e": [n]
                        }],
                        "rounded-t": [{
                            "rounded-t": [n]
                        }],
                        "rounded-r": [{
                            "rounded-r": [n]
                        }],
                        "rounded-b": [{
                            "rounded-b": [n]
                        }],
                        "rounded-l": [{
                            "rounded-l": [n]
                        }],
                        "rounded-ss": [{
                            "rounded-ss": [n]
                        }],
                        "rounded-se": [{
                            "rounded-se": [n]
                        }],
                        "rounded-ee": [{
                            "rounded-ee": [n]
                        }],
                        "rounded-es": [{
                            "rounded-es": [n]
                        }],
                        "rounded-tl": [{
                            "rounded-tl": [n]
                        }],
                        "rounded-tr": [{
                            "rounded-tr": [n]
                        }],
                        "rounded-br": [{
                            "rounded-br": [n]
                        }],
                        "rounded-bl": [{
                            "rounded-bl": [n]
                        }],
                        "border-w": [{
                            border: [s]
                        }],
                        "border-w-x": [{
                            "border-x": [s]
                        }],
                        "border-w-y": [{
                            "border-y": [s]
                        }],
                        "border-w-s": [{
                            "border-s": [s]
                        }],
                        "border-w-e": [{
                            "border-e": [s]
                        }],
                        "border-w-t": [{
                            "border-t": [s]
                        }],
                        "border-w-r": [{
                            "border-r": [s]
                        }],
                        "border-w-b": [{
                            "border-b": [s]
                        }],
                        "border-w-l": [{
                            "border-l": [s]
                        }],
                        "border-opacity": [{
                            "border-opacity": [y]
                        }],
                        "border-style": [{
                            border: [].concat(getLineStyles(), ["hidden"])
                        }],
                        "divide-x": [{
                            "divide-x": [s]
                        }],
                        "divide-x-reverse": ["divide-x-reverse"],
                        "divide-y": [{
                            "divide-y": [s]
                        }],
                        "divide-y-reverse": ["divide-y-reverse"],
                        "divide-opacity": [{
                            "divide-opacity": [y]
                        }],
                        "divide-style": [{
                            divide: getLineStyles()
                        }],
                        "border-color": [{
                            border: [i]
                        }],
                        "border-color-x": [{
                            "border-x": [i]
                        }],
                        "border-color-y": [{
                            "border-y": [i]
                        }],
                        "border-color-t": [{
                            "border-t": [i]
                        }],
                        "border-color-r": [{
                            "border-r": [i]
                        }],
                        "border-color-b": [{
                            "border-b": [i]
                        }],
                        "border-color-l": [{
                            "border-l": [i]
                        }],
                        "divide-color": [{
                            divide: [i]
                        }],
                        "outline-style": [{
                            outline: [""].concat(getLineStyles())
                        }],
                        "outline-offset": [{
                            "outline-offset": [isArbitraryValue, isLength]
                        }],
                        "outline-w": [{
                            outline: [isLength]
                        }],
                        "outline-color": [{
                            outline: [r]
                        }],
                        "ring-w": [{
                            ring: getLengthWithEmpty()
                        }],
                        "ring-w-inset": ["ring-inset"],
                        "ring-color": [{
                            ring: [r]
                        }],
                        "ring-opacity": [{
                            "ring-opacity": [y]
                        }],
                        "ring-offset-w": [{
                            "ring-offset": [isLength]
                        }],
                        "ring-offset-color": [{
                            "ring-offset": [r]
                        }],
                        shadow: [{
                            shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
                        }],
                        "shadow-color": [{
                            shadow: [isAny]
                        }],
                        opacity: [{
                            opacity: [y]
                        }],
                        "mix-blend": [{
                            "mix-blend": getBlendModes()
                        }],
                        "bg-blend": [{
                            "bg-blend": getBlendModes()
                        }],
                        filter: [{
                            filter: ["", "none"]
                        }],
                        blur: [{
                            blur: [t]
                        }],
                        brightness: [{
                            brightness: [o]
                        }],
                        contrast: [{
                            contrast: [l]
                        }],
                        "drop-shadow": [{
                            "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
                        }],
                        grayscale: [{
                            grayscale: [c]
                        }],
                        "hue-rotate": [{
                            "hue-rotate": [d]
                        }],
                        invert: [{
                            invert: [u]
                        }],
                        saturate: [{
                            saturate: [v]
                        }],
                        sepia: [{
                            sepia: [x]
                        }],
                        "backdrop-filter": [{
                            "backdrop-filter": ["", "none"]
                        }],
                        "backdrop-blur": [{
                            "backdrop-blur": [t]
                        }],
                        "backdrop-brightness": [{
                            "backdrop-brightness": [o]
                        }],
                        "backdrop-contrast": [{
                            "backdrop-contrast": [l]
                        }],
                        "backdrop-grayscale": [{
                            "backdrop-grayscale": [c]
                        }],
                        "backdrop-hue-rotate": [{
                            "backdrop-hue-rotate": [d]
                        }],
                        "backdrop-invert": [{
                            "backdrop-invert": [u]
                        }],
                        "backdrop-opacity": [{
                            "backdrop-opacity": [y]
                        }],
                        "backdrop-saturate": [{
                            "backdrop-saturate": [v]
                        }],
                        "backdrop-sepia": [{
                            "backdrop-sepia": [x]
                        }],
                        "border-collapse": [{
                            border: ["collapse", "separate"]
                        }],
                        "border-spacing": [{
                            "border-spacing": [a]
                        }],
                        "border-spacing-x": [{
                            "border-spacing-x": [a]
                        }],
                        "border-spacing-y": [{
                            "border-spacing-y": [a]
                        }],
                        "table-layout": [{
                            table: ["auto", "fixed"]
                        }],
                        caption: [{
                            caption: ["top", "bottom"]
                        }],
                        transition: [{
                            transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
                        }],
                        duration: [{
                            duration: getNumberAndArbitrary()
                        }],
                        ease: [{
                            ease: ["linear", "in", "out", "in-out", isArbitraryValue]
                        }],
                        delay: [{
                            delay: getNumberAndArbitrary()
                        }],
                        animate: [{
                            animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
                        }],
                        transform: [{
                            transform: ["", "gpu", "none"]
                        }],
                        scale: [{
                            scale: [A]
                        }],
                        "scale-x": [{
                            "scale-x": [A]
                        }],
                        "scale-y": [{
                            "scale-y": [A]
                        }],
                        rotate: [{
                            rotate: [isInteger, isArbitraryValue]
                        }],
                        "translate-x": [{
                            "translate-x": [S]
                        }],
                        "translate-y": [{
                            "translate-y": [S]
                        }],
                        "skew-x": [{
                            "skew-x": [w]
                        }],
                        "skew-y": [{
                            "skew-y": [w]
                        }],
                        "transform-origin": [{
                            origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
                        }],
                        accent: [{
                            accent: ["auto", r]
                        }],
                        appearance: ["appearance-none"],
                        cursor: [{
                            cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
                        }],
                        "caret-color": [{
                            caret: [r]
                        }],
                        "pointer-events": [{
                            "pointer-events": ["none", "auto"]
                        }],
                        resize: [{
                            resize: ["none", "y", "x", ""]
                        }],
                        "scroll-behavior": [{
                            scroll: ["auto", "smooth"]
                        }],
                        "scroll-m": [{
                            "scroll-m": getSpacingWithArbitrary()
                        }],
                        "scroll-mx": [{
                            "scroll-mx": getSpacingWithArbitrary()
                        }],
                        "scroll-my": [{
                            "scroll-my": getSpacingWithArbitrary()
                        }],
                        "scroll-ms": [{
                            "scroll-ms": getSpacingWithArbitrary()
                        }],
                        "scroll-me": [{
                            "scroll-me": getSpacingWithArbitrary()
                        }],
                        "scroll-mt": [{
                            "scroll-mt": getSpacingWithArbitrary()
                        }],
                        "scroll-mr": [{
                            "scroll-mr": getSpacingWithArbitrary()
                        }],
                        "scroll-mb": [{
                            "scroll-mb": getSpacingWithArbitrary()
                        }],
                        "scroll-ml": [{
                            "scroll-ml": getSpacingWithArbitrary()
                        }],
                        "scroll-p": [{
                            "scroll-p": getSpacingWithArbitrary()
                        }],
                        "scroll-px": [{
                            "scroll-px": getSpacingWithArbitrary()
                        }],
                        "scroll-py": [{
                            "scroll-py": getSpacingWithArbitrary()
                        }],
                        "scroll-ps": [{
                            "scroll-ps": getSpacingWithArbitrary()
                        }],
                        "scroll-pe": [{
                            "scroll-pe": getSpacingWithArbitrary()
                        }],
                        "scroll-pt": [{
                            "scroll-pt": getSpacingWithArbitrary()
                        }],
                        "scroll-pr": [{
                            "scroll-pr": getSpacingWithArbitrary()
                        }],
                        "scroll-pb": [{
                            "scroll-pb": getSpacingWithArbitrary()
                        }],
                        "scroll-pl": [{
                            "scroll-pl": getSpacingWithArbitrary()
                        }],
                        "snap-align": [{
                            snap: ["start", "end", "center", "align-none"]
                        }],
                        "snap-stop": [{
                            snap: ["normal", "always"]
                        }],
                        "snap-type": [{
                            snap: ["none", "x", "y", "both"]
                        }],
                        "snap-strictness": [{
                            snap: ["mandatory", "proximity"]
                        }],
                        touch: [{
                            touch: ["auto", "none", "pinch-zoom", "manipulation", {
                                pan: ["x", "left", "right", "y", "up", "down"]
                            }]
                        }],
                        select: [{
                            select: ["none", "text", "all", "auto"]
                        }],
                        "will-change": [{
                            "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
                        }],
                        fill: [{
                            fill: [r, "none"]
                        }],
                        "stroke-w": [{
                            stroke: [isLength, isArbitraryNumber]
                        }],
                        stroke: [{
                            stroke: [r, "none"]
                        }],
                        sr: ["sr-only", "not-sr-only"]
                    },
                    conflictingClassGroups: {
                        overflow: ["overflow-x", "overflow-y"],
                        overscroll: ["overscroll-x", "overscroll-y"],
                        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
                        "inset-x": ["right", "left"],
                        "inset-y": ["top", "bottom"],
                        flex: ["basis", "grow", "shrink"],
                        gap: ["gap-x", "gap-y"],
                        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
                        px: ["pr", "pl"],
                        py: ["pt", "pb"],
                        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
                        mx: ["mr", "ml"],
                        my: ["mt", "mb"],
                        "font-size": ["leading"],
                        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                        "fvn-ordinal": ["fvn-normal"],
                        "fvn-slashed-zero": ["fvn-normal"],
                        "fvn-figure": ["fvn-normal"],
                        "fvn-spacing": ["fvn-normal"],
                        "fvn-fraction": ["fvn-normal"],
                        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                        "rounded-s": ["rounded-ss", "rounded-es"],
                        "rounded-e": ["rounded-se", "rounded-ee"],
                        "rounded-t": ["rounded-tl", "rounded-tr"],
                        "rounded-r": ["rounded-tr", "rounded-br"],
                        "rounded-b": ["rounded-br", "rounded-bl"],
                        "rounded-l": ["rounded-tl", "rounded-bl"],
                        "border-spacing": ["border-spacing-x", "border-spacing-y"],
                        "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                        "border-w-x": ["border-w-r", "border-w-l"],
                        "border-w-y": ["border-w-t", "border-w-b"],
                        "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                        "border-color-x": ["border-color-r", "border-color-l"],
                        "border-color-y": ["border-color-t", "border-color-b"],
                        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                        "scroll-mx": ["scroll-mr", "scroll-ml"],
                        "scroll-my": ["scroll-mt", "scroll-mb"],
                        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                        "scroll-px": ["scroll-pr", "scroll-pl"],
                        "scroll-py": ["scroll-pt", "scroll-pb"]
                    },
                    conflictingClassGroupModifiers: {
                        "font-size": ["leading"]
                    }
                }
            })
        }
    }
]);